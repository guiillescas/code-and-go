export interface AlternativeProps {
  id: string
  description: string
  selected: boolean
}

export interface CustomQuestionProps {
  id: string
  title: string
  description: string
  alternatives: AlternativeProps[]
}
