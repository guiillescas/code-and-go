import { Dispatch, ReactNode, SetStateAction } from 'react'

import { MenuProps } from 'components/Breadcrumb/types'

export interface ExerciseProps {
  id: string
  title: string
  description: string
  baseCode: string
  testCases: [
    {
      id: string
      title: string
    },
  ]
}

export interface AlternativeProps {
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
  id: string
  name: string
  description: string
  totalLessons: number
  moduleType: 'Skill' | 'Test'
}

export interface LanguageProps {
  name: string
  value: number
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
  language: LanguageProps
  sections: SectionProps[]
}

export interface CourseContextData {
  course: CourseProps | null
  setCourse: Dispatch<SetStateAction<CourseProps | null>>
  selectedModuule: ModuleProps
  setSelectedModuule: Dispatch<SetStateAction<ModuleProps>>
  breadcrumb: MenuProps[]
  setBreadcrumb: Dispatch<SetStateAction<MenuProps[]>>

  getCourse: (courseId: string) => void
}

export interface CourseProviderProps {
  children: ReactNode
}
