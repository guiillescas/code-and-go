import { Fragment, ReactElement, useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { toast } from 'react-toastify'

import BaseModal from 'components/BaseModal'
import Button from 'components/Button'
import { ButtonVariantsEnum } from 'components/Button/types'
import CodeEditorWindow from 'components/CodeEditor'

import { languageOptions } from 'constants/languageOptions'

import { useAuth } from 'hooks/useAuth'
import { ExerciseProps, QuestionProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import * as Styles from './styles'

import Question from '../Question'
import { ModuleModalProps } from './types'

interface StepProps {
  id: number
  isActive: boolean
  isComplete: boolean
  question: QuestionProps | null
  exercise: ExerciseProps | null
}

export default function ModuleModal(props: ModuleModalProps): ReactElement {
  const { token, updateUser, user } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const [steps, setSteps] = useState<StepProps[]>([])

  function nextStep(indexOfCurrentSteo: number) {
    setSteps((prevState) => {
      return prevState.map((step, index) => {
        if (step.isActive && !step.isComplete) {
          return {
            ...step,
            isActive: false,
            isComplete: true,
          }
        }

        if (index === indexOfCurrentSteo + 1) {
          return {
            ...step,
            isActive: true,
          }
        }

        return step
      })
    })
  }

  function handleSendQuestion(
    question: QuestionProps,
    indexOfCurrentStep: number,
  ) {
    setIsLoading(true)

    const questionIndex = props.questions.findIndex(
      (questionFromProps) => questionFromProps.id === question.id,
    )

    const alternativeId = props.questions[questionIndex].alternatives.find(
      (alternative: any) => alternative.selected,
    )?.id

    if (!alternativeId) {
      toast.warning('Marque uma opção para enviar a questão')
      setIsLoading(false)

      return
    }

    api(token)
      .put(`/lesson/${props.lessonId}/resolve/question`, {
        questionId: props.questions[questionIndex].id,
        alternativeId,
      })
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

        nextStep(indexOfCurrentStep)
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 400) {
          toast.error('Você não pode mandar um exercício duas ou mais vezes.')

          return
        }

        toast.error('Erro inesperado ao enviar exercício')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleSendExercise(
    exercise: ExerciseProps,
    indexOfCurrentStep: number,
  ) {
    setIsLoading(true)

    const exerciseIndex = props.exercises.findIndex(
      (exerciseFromProps) => exerciseFromProps.id === exercise.id,
    )

    props.exercises[exerciseIndex].testCases.forEach((testCase) => {
      api(token)
        .put(`/lesson/${props.lessonId}/resolve/exercise`, {
          exerciseId: props.exercises[exerciseIndex].id,
          testCaseId: testCase.id,
          solutionCode: code,
        })
        .then((response) => {
          if (response.data.message === 'Sucesso no Teste') {
            toast.success('Resposta correta!')
          } else {
            toast.warning('Resposta incorreta!')
          }

          nextStep(indexOfCurrentStep)
        })
        .catch(() => {
          toast.error('Erro inesperado ao enviar exercício')
        })
        .finally(() => {
          setIsLoading(false)
        })
    })
  }

  useEffect(() => {
    if (props.isOpen) {
      const sumOfLessons = props.questions.length + props.exercises.length

      const totalOfQuestions = props.questions.length
      const totalOfExercises = props.exercises.length

      let currentIndexOfQuestion = 0
      let currentIndexOfExercise = 0

      let isQuestionComplete = false

      for (let index = 0; index < sumOfLessons - 1; index++) {
        if (
          index <= totalOfQuestions - 1 &&
          totalOfQuestions !== currentIndexOfQuestion
        ) {
          setSteps((prevState) => {
            return [
              ...prevState,
              {
                id: index,
                isActive: index === 0,
                isComplete: false,
                question: props.questions[index],
                exercise: null,
              },
            ]
          })

          currentIndexOfQuestion++

          if (index === totalOfQuestions - 1) {
            isQuestionComplete = true
          }
        }

        console.log(isQuestionComplete)

        if (
          isQuestionComplete &&
          index - currentIndexOfQuestion <= totalOfExercises - 1
        ) {
          setSteps((prevState) => {
            return [
              ...prevState,
              {
                id: index,
                isActive: false,
                isComplete: false,
                question: null,
                exercise: props.exercises[index - currentIndexOfQuestion + 1],
              },
            ]
          })

          currentIndexOfExercise++
        }
      }
    }
  }, [props.isOpen])

  function onRequestClose() {
    setSteps([])
    props.onRequestClose()
  }

  function handleFinishdLesson() {
    setIsLoading(true)

    api(token)
      .put(`/lesson/${props.lessonId}/finish`)
      .then((response) => {
        if (response.data.isFailed) {
          toast.warning(response.data.message)
        } else {
          toast.success(response.data.message)
        }
      })
      .catch(() => {
        toast.error('Erro ao finalizar exercício. Tente novamente mais tarde')
      })
      .finally(() => {
        setSteps([])
        setIsLoading(false)

        onRequestClose()
      })
  }

  // ================= CODE EDITOR ====================
  const [code, setCode] = useState(`// Escreva o código aqui`)
  const [language, setLanguage] = useState(languageOptions[0])

  const onCodeChange = (action: any, data: any) => {
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

  return (
    <BaseModal
      isOpen={props.isOpen}
      onRequestClose={onRequestClose}
      title={`Módulo ${props.module && props.module.moduleSequence}`}
      maxWidth={750}
    >
      <Styles.ModuleModalContainer>
        <div className="lesson-wrapper">
          {steps.map((step, index) => {
            if (step.isActive) {
              if (step.question) {
                return (
                  <Fragment key={step.id}>
                    <Question
                      title={step.question.title}
                      description={step.question.description}
                      alternatives={step.question.alternatives}
                      setQuestions={props.setQuestions}
                    />

                    <Button
                      onClick={() => handleSendQuestion(step.question!, index!)}
                      isLoading={isLoading}
                    >
                      Próxima
                    </Button>
                  </Fragment>
                )
              } else {
                return (
                  <div className="exercise" key={step.exercise?.id}>
                    <div className="exercise-wrapper">
                      <h4>{step.exercise?.title}</h4>
                      <p>{step.exercise?.description}</p>

                      <CodeEditorWindow
                        code={code}
                        onChange={onCodeChange}
                        language={language?.value}
                        theme="GitHub"
                      />
                    </div>

                    <Button
                      variant={ButtonVariantsEnum.PRIMARY}
                      onClick={() => handleSendExercise(step.exercise!, index!)}
                      isLoading={isLoading}
                    >
                      Enviar exercício
                    </Button>
                  </div>
                )
              }
            } else {
              return ''
            }
          })}
        </div>

        {!steps.find((step) => !step.isComplete) && (
          <div className="well-done-wrapper">
            <h3>Muito bem!</h3>
            <p>Você terminou mais um módulo!</p>

            <Button isLoading={isLoading} onClick={handleFinishdLesson}>
              Finalizar
            </Button>
          </div>
        )}

        <div className="dots">
          {steps.map((step) => {
            return (
              <div
                className={`dot ${
                  (step.isActive || step.isComplete) && 'active'
                }`}
                key={step.id}
              />
            )
          })}
        </div>
      </Styles.ModuleModalContainer>
    </BaseModal>
  )
}
