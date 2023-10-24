import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import Loading from '@/components/Loading'
import axios from 'axios'
import { useTheme } from 'styled-components'
import useKeyPress from 'utils/useKeyPress'

import ModuleModal from './components/ModuleModal'
import Button from 'components/Button'
import ExerciseFeedbackModal from 'components/ExerciseFeedbackModal'

import { languageOptions } from 'constants/languageOptions'

import { useAuth } from 'hooks/useAuth'
import { useCourse } from 'hooks/useCourse'
import {
  CourseProps,
  ExerciseProps,
  ModuleProps,
  QuestionProps,
} from 'hooks/useCourse/types'

import { api } from 'services/api'

import AppLayout from 'layouts/AppLayout'

import { defineTheme } from 'lib/defineTheme'

import * as Styles from './styles'

export interface FormattedModuleProps extends ModuleProps {
  moduleSequence: string | null
}

export interface ModuleTrackingProps {
  id: string
  moduleId: string
  lessonsCompleted: number
  status: number
}

export default function Course(): ReactElement {
  const router = useRouter()
  const theme = useTheme()

  const { token, user } = useAuth()
  const { course, setCourse } = useCourse()

  const [isLoading, setIsLoading] = useState(false)

  const [modules, setModules] = useState<FormattedModuleProps[]>([])
  const [lessonId, setLessonId] = useState('')

  const [
    idsOfFinishedModulesAndCurrentModule,
    setIdsOfFinishedModulesAndCurrentModule,
  ] = useState<string[]>([])

  const [isLessonStartLoading, setIsLessonStartLoading] = useState(false)
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
  const [selectedModule, setSelectedModule] =
    useState<FormattedModuleProps | null>(null)

  useEffect(() => {
    api(token)
      .get<CourseProps[]>('/course')
      .then((response) => {
        const course = response.data.find(
          (course) => course.id === router.query.id,
        )
        if (course) {
          setCourse(course)
        }
      })
  }, [router.query.id, setCourse, token])

  useEffect(() => {
    const sectionId = router.query.sectionId

    const section = course?.sections.find((section) => section.id === sectionId)

    const formattedModules = section?.modules.map((module) => {
      return {
        ...module,
        moduleSequence: null,
      }
    })

    if (formattedModules) {
      setModules(formattedModules)
    }
  }, [course?.sections, router.query.sectionId])

  // ================= MOVED AFTER ======================

  const [isSuccess, setIsSuccess] = useState(false)

  const [isExerciseFeedbackModalOpen, setIsExerciseFeedbackModalOpen] =
    useState(false)

  /// ///////////// CODE EDITOR /////

  const [questions, setQuestions] = useState<any[]>([])
  const [exercises, setExercises] = useState<ExerciseProps[]>([])
  const [clickedModule, setClickedModule] =
    useState<FormattedModuleProps | null>(null)

  const [code, setCode] = useState(`// Escreva o código aqui`)
  const [language, setLanguage] = useState(languageOptions[0])

  const enterPress = useKeyPress('Enter')
  const ctrlPress = useKeyPress('Control')

  // TODO - Adicionar tipagem correta
  const onChange = (action: any, data: any) => {
    switch (action) {
      case 'code': {
        setCode(data)
        break
      }
      default: {
        console.warn('case not handled!', action, data)
      }
    }
  }

  const handleCompile = () => {
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(''),
    }
    const options = {
      method: 'POST',
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    }

    axios
      .request(options)
      .then(function (response) {
        console.log('res.data', response.data)
        const token = response.data.token
        checkStatus(token)
      })
      .catch((err) => {
        const error = err.response ? err.response.data : err
        // get error status
        const status = err.response.status
        console.log('status', status)
        if (status === 429) {
          console.log('too many requests', status)

          // showErrorToast(
          //   `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
          //   10000
          // );
        }
        console.log('catch block...', error)
      })
  }

  // TODO - Adicionar tipagem correta
  async function checkStatus(token: any) {
    const options = {
      method: 'GET',
      url: process.env.REACT_APP_RAPID_API_URL + '/' + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      },
    }
    try {
      const response = await axios.request(options)
      const statusId = response.data.status?.id

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        // showSuccessToast(`Compiled Successfully!`);
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log('err', err)
    }
  }

  // SUBMIT EXERCISE AND LESSON

  // function handleSendExercise(exerciseIndex: number) {
  //   setIsLoading(true)

  //   exercises[exerciseIndex].testCases.forEach((testCase) => {
  //     api(token)
  //       .put(`/lesson/${lessonId}/resolve/exercise`, {
  //         exerciseId: exercises[exerciseIndex].id,
  //         testCaseId: testCase.id,
  //         solutionCode: code,
  //       })
  //       .then((response) => {
  //         if (response.data.message === 'Sucesso no Teste') {
  //           toast.success('Resposta correta!')
  //         } else {
  //           toast.warning('Resposta incorreta!')
  //         }
  //       })
  //       .catch(() => {
  //         toast.error('Erro inesperado ao enviar exercício')
  //       })
  //   })

  //   setIsLoading(false)
  // }

  useEffect(() => {
    defineTheme('GitHub')
  }, [])

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log('enterPress', enterPress)
      console.log('ctrlPress', ctrlPress)
      handleCompile()
    }
  }, [ctrlPress, enterPress])

  useEffect(() => {
    if (!course) {
      const courseId = router.query.id

      api(token)
        .get<CourseProps[]>('/course')
        .then((response) => {
          const course = response.data.filter(
            (course) => course.id === courseId,
          )

          setCourse(course[0])
        })
    }
  }, [router.query.id, setCourse, token])

  useEffect(() => {
    if (course) {
      setIsLoading(true)

      api(token)
        .get(`/progress/${course?.id}`)
        .then((response) => {
          const completedModulesIds = response.data.completedModuleId || []
          const currentModuleIds = response.data.moduleTrackings.map(
            (moduleTracking: ModuleTrackingProps) => {
              return moduleTracking.moduleId
            },
          )

          setIdsOfFinishedModulesAndCurrentModule([
            ...completedModulesIds,
            ...currentModuleIds,
          ])
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [course, token])

  function handleStartModule(
    module: FormattedModuleProps,
    moduleSequence: string,
  ) {
    setClickedModule(module)
    setIsLessonStartLoading(true)

    if (course) {
      api(token)
        .post(`/lesson/${course?.id}/module/${module.id}/start`)
        .then((response) => {
          setLessonId(response.data.lessonId)

          setQuestions(
            response?.data.questions.map((question: QuestionProps) => {
              return {
                ...question,
                alternatives: question.alternatives.map((alternative) => {
                  return {
                    ...alternative,
                    selected: false,
                  }
                }),
              }
            }),
          )
          setExercises(response?.data.exercises)

          setSelectedModule({
            ...module,
            moduleSequence,
          })
          setIsModuleModalOpen(true)
        })
        .finally(() => {
          setIsLessonStartLoading(false)
        })
    }
  }

  return (
    <AppLayout>
      <Styles.CourseContainer>
        <section>
          <h1>Curso de {course?.name}</h1>

          <div className="content">
            <h2>Módulos</h2>

            {isLoading ? (
              <div className="loading-wrapper">
                <Loading color={theme?.colors.white[500]} />

                <p>Carregando</p>
              </div>
            ) : (
              modules.map((module, index) => {
                const formattedIndex = `0${index + 1}`.slice(-2)

                return (
                  <Styles.ModuleCard key={module.id}>
                    <p>Módulo {formattedIndex}</p>

                    <Button
                      onClick={() => handleStartModule(module, formattedIndex)}
                      disabled={
                        user.lifeCount <= 0 ||
                        !idsOfFinishedModulesAndCurrentModule.includes(
                          module.id,
                        )
                      }
                      isLoading={
                        isLessonStartLoading && clickedModule === module
                      }
                    >
                      Iniciar módulo
                    </Button>
                  </Styles.ModuleCard>
                )
              })
            )}
          </div>
        </section>

        <ExerciseFeedbackModal
          isOpen={isExerciseFeedbackModalOpen}
          onRequestClose={() => setIsExerciseFeedbackModalOpen(false)}
          isSuccess={isSuccess}
        />

        {selectedModule && (
          <ModuleModal
            isOpen={isModuleModalOpen}
            onRequestClose={() => setIsModuleModalOpen(false)}
            modules={modules}
            module={selectedModule}
            setQuestions={setQuestions}
            questions={questions}
            exercises={exercises}
            lessonId={lessonId}
            setIdsOfFinishedModulesAndCurrentModule={
              setIdsOfFinishedModulesAndCurrentModule
            }
          />
        )}
      </Styles.CourseContainer>
    </AppLayout>
  )
}
