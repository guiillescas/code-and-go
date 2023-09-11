import { ReactElement, useEffect, useState } from 'react'

import CourseCard from 'components/CourseCard'

import { useAuth } from 'hooks/useAuth'
import { CourseProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import * as Styles from './styles'

export default function Courses(): ReactElement {
  const { token } = useAuth()

  const [courses, setCourses] = useState<CourseProps[]>([])

  useEffect(() => {
    api(token)
      .get<CourseProps[]>('/course')
      .then((response) => {
        setCourses(response.data)
      })
  }, [])

  return (
    <Styles.CoursesContainer>
      <h1>Meus cursos</h1>

      <Styles.CoursesWrapper>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </Styles.CoursesWrapper>
    </Styles.CoursesContainer>
  )
}
