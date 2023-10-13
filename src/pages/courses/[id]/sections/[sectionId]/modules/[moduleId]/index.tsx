import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import {
  CourseProps,
  ExerciseProps,
  QuestionProps,
} from '@/hooks/useCourse/types'
import axios from 'axios'
import { toast } from 'react-toastify'
import useKeyPress from 'utils/useKeyPress'

import Question from './components/Question'
import Accordion from 'components/Accordion'
import Button from 'components/Button'
import { ButtonVariantsEnum } from 'components/Button/types'
import CodeEditorWindow from 'components/CodeEditor'
import ExerciseFeedbackModal from 'components/ExerciseFeedbackModal'

import { languageOptions } from 'constants/languageOptions'

import { useAuth } from 'hooks/useAuth'
import { useCourse } from 'hooks/useCourse'

import { api } from 'services/api'

import { defineTheme } from 'lib/defineTheme'

import * as Styles from './styles'

import { CustomQuestionProps } from './types'

const javascriptDefault = `// Escreva o código aqui`

export default function Module(): ReactElement {
  const router = useRouter()

  const { token, user, updateUser } = useAuth()

  const { course, selectedModuule, setCourse, setBreadcrumb } = useCourse()

  const [isLoading, setIsLoading] = useState(false)

  const [isExerciseFeedbackModalOpen, setIsExerciseFeedbackModalOpen] =
    useState(false)

  const [questions, setQuestions] = useState<CustomQuestionProps[]>([])
  const [exercises, setExercises] = useState<ExerciseProps[]>([])

  const [code, setCode] = useState(javascriptDefault)
  const [customInput, setCustomInput] = useState('')
  const [outputDetails, setOutputDetails] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [theme, setTheme] = useState('GitHub')
  const [language, setLanguage] = useState(languageOptions[0])

  const [isSuccess, setIsSuccess] = useState(false)

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
    setProcessing(true)

    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
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
        setProcessing(false)
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
        setProcessing(false)
        setOutputDetails(response.data)
        // showSuccessToast(`Compiled Successfully!`);
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log('err', err)
      setProcessing(false)
      // showErrorToast();
    }
  }

  // function handleMarkAlternative(alternativeId: string) {

  // }

  function handleSendExercise(exerciseIndex: number) {
    setIsLoading(true)

    const testCaseId = exercises[exerciseIndex].testCases.find(
      (testCase) => testCase.id,
    )?.id

    console.log(testCaseId)

    api(token)
      .post(`/exercise/${exercises[exerciseIndex].id}/resolve/${testCaseId}`, {
        solutionCode: code,
      })
      .then((response) => {
        if (response.data.message === 'Sucesso no Teste') {
          toast.success('Resposta correta!')
        } else {
          toast.warning('Resposta incorreta!')
        }
      })
      .catch(() => {
        toast.error('Erro inesperado ao enviar exercício')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateQuestion(questionIndex: number) {
    setIsLoading(true)

    // setTimeout(() => {
    //   if (alternativeId === '2f3b6478-717f-4f47-a0a8-841812653db7') {
    //     setIsExerciseFeedbackModalOpen(true)
    //     setIsSuccess(true)
    //   } else {
    //     setIsExerciseFeedbackModalOpen(true)
    //     setIsSuccess(false)
    //   }

    //   setIsLoading(false)
    // }, 600)

    const alternativeId = questions[questionIndex].alternatives.find(
      (alternative) => alternative.selected,
    )?.id

    api(token)
      .post(`/question/${questions[questionIndex].id}/resolve/${alternativeId}`)
      .then((response) => {
        if (response.data.isCorrect) {
          toast.success('Resposta correta!')
        } else {
          toast.warning('Resposta incorreta!')

          if (user.lifeCount > 0) {
            updateUser({
              ...user,
              lifeCount: user.lifeCount - 1,
            })
          }
        }
      })
      .catch(() => {
        toast.error('Erro inesperado ao enviar exercício')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    defineTheme('GitHub').then((_) => setTheme('GitHub'))
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
  }, [
    router.query.id,
    selectedModuule.id,
    selectedModuule.name,
    setBreadcrumb,
    setCourse,
    token,
  ])

  useEffect(() => {
    if (course) {
      const moduleId = router.query.moduleId

      api(token)
        .get(`/course/${course?.id}/module/${moduleId}/start`)
        .then((response) => {
          setQuestions(
            response.data.questions.map((question: QuestionProps) => {
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
          setExercises(response.data.exercises)
        })
    }
  }, [course, course?.id, router.query.moduleId, token])

  return (
    <Styles.ModuleContainer>
      <div className="content">
        <div className="breadcrumb">
          {/* <Breadcrumb menus={breadcrumb} /> */}
        </div>

        <div className="questions">
          {questions.length > 0 &&
            questions?.map((question, index) => {
              const questionNumber = ('0' + `${index + 1}`).slice(-2)

              return (
                <Accordion
                  title={`Questão ${questionNumber}`}
                  key={question.title}
                  isOpen={index === 0}
                >
                  <Question
                    title={question.title}
                    alternatives={question.alternatives}
                    setQuestions={setQuestions}
                  />

                  <Button
                    variant={ButtonVariantsEnum.PRIMARY}
                    onClick={() => handleUpdateQuestion(index)}
                    isLoading={isLoading}
                  >
                    Enviar questão
                  </Button>
                </Accordion>
              )
            })}

          {exercises.length > 0 &&
            exercises.map((exercise, index) => (
              <Accordion title="Exercício" isOpen={false} key={exercise.id}>
                <div className="ecercise-wrapper">
                  <p>{exercise.description}</p>

                  <CodeEditorWindow
                    code={code}
                    onChange={onChange}
                    language={language?.value}
                    theme={theme}
                  />
                </div>

                <Button
                  variant={ButtonVariantsEnum.PRIMARY}
                  onClick={() => handleSendExercise(index)}
                  isLoading={isLoading}
                >
                  Enviar exercício
                </Button>
              </Accordion>
            ))}

          <div className="footer">
            {/* <Button
              variant={ButtonVariantsEnum.PRIMARY}
              onClick={() => handleFinishModule()}
              isLoading={isLoading}
            >
              Enviar
            </Button> */}
          </div>
        </div>
      </div>

      <ExerciseFeedbackModal
        isOpen={isExerciseFeedbackModalOpen}
        onRequestClose={() => setIsExerciseFeedbackModalOpen(false)}
        isSuccess={isSuccess}
      />
    </Styles.ModuleContainer>
  )
}
