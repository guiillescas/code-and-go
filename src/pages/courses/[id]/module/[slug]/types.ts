interface AlternativeProps {
  id: string
  description: string
}

export interface QuestionProps {
  id: string
  title: string
  description: string
  alternatives: AlternativeProps[]
}

export interface ModuleProps {
  id: number
  title: string
}
