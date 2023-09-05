import { createContext, useContext, useState } from 'react'

import { api } from '@/services/api'

import { MenuProps } from 'components/Breadcrumb/types'

import {
  CourseContextData,
  CourseProps,
  CourseProviderProps,
  ModuleProps,
} from './types'

export const CourseContext = createContext<CourseContextData>(
  {} as CourseContextData,
)

export function CourseProvider({ children }: CourseProviderProps) {
  const [course, setCourse] = useState<CourseProps | null>(null)
  const [selectedModuule, setSelectedModuule] = useState<ModuleProps>(
    {} as ModuleProps,
  )
  const [breadcrumb, setBreadcrumb] = useState<MenuProps[]>([])

  async function getCourse(courseId: string) {
    api.get<CourseProps[]>('/course').then((response) => {
      const course = response.data.filter((course) => course.id === courseId)

      setCourse(course[0])
    })
  }

  return (
    <CourseContext.Provider
      value={{
        course,
        setCourse,
        selectedModuule,
        setSelectedModuule,
        breadcrumb,
        setBreadcrumb,

        getCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

export function useCourse(): CourseContextData {
  const context = useContext(CourseContext)

  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider')
  }

  return context
}

export default CourseContext
