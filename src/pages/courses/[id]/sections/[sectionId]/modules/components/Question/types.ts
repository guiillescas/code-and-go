import { Dispatch, SetStateAction } from 'react'

import { AlternativeProps } from '@/hooks/useCourse/types'

export interface QuestionProps {
  title: string
  description: string
  alternatives: AlternativeProps[]
  setQuestions: Dispatch<SetStateAction<any[]>>
  // setQuestions: Dispatch<SetStateAction<CustomQuestionProps[]>>
}
