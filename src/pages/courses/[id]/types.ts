export interface ModuleProps {
  id: string
  name: string
  totalLessons: number
  moduleType: string
}

export interface SectionProps {
  id: string
  name: string
  description: string
  modules: ModuleProps[]
}

export interface CourseProps {
  id: string
  name: string
  authorName: string
  description: string
  courseIcon: string | null
  language: {
    name: string
    value: number
  }
  sections: SectionProps[]
}
