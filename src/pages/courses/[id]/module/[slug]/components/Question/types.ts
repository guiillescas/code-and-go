interface AlternativesProps {
  name: string
  value: string
}

export interface QuestionProps {
  title: string
  alternatives: AlternativesProps[]
}
