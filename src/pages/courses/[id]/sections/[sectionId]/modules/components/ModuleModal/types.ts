import { Dispatch, SetStateAction } from 'react'

import { BasicModalProps } from 'components/BaseModal/types'

import { ExerciseProps, QuestionProps } from 'hooks/useCourse/types'

import { FormattedModuleProps } from '../..'

export interface ModuleModalProps extends BasicModalProps {
  module: FormattedModuleProps
  questions: QuestionProps[]
  setQuestions: Dispatch<SetStateAction<QuestionProps[]>>
  exercises: ExerciseProps[]
  lessonId: string
}
