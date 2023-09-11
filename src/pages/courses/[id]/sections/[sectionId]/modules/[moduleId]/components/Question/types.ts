import { Dispatch, SetStateAction } from 'react'

import { AlternativeProps, CustomQuestionProps } from '../../types'

export interface QuestionProps {
  title: string
  alternatives: AlternativeProps[]
  setQuestions: Dispatch<SetStateAction<CustomQuestionProps[]>>
}
