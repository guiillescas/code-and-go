interface LanguageProps {
  value: number
  name: string
}

interface ModuleProps {
  id: string
  moduleType: string
  name: string
  totalLessons: number
}

interface SectionProps {
  description: string
  id: string
  modules: ModuleProps[]
  name: string
}
