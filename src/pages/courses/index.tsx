import { ReactElement, useEffect, useState } from 'react'

import Loading from '@/components/Loading'
import AppLayout from 'layouts/AppLayout'
import { useTheme } from 'styled-components'

import CourseCard from 'components/CourseCard'

import { useAuth } from 'hooks/useAuth'
import { CourseProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import * as Styles from './styles'

export default function Courses(): ReactElement {
  const { token, user } = useAuth()

  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(true)
  const [courses, setCourses] = useState<CourseProps[]>([])

  useEffect(() => {
    api(token)
      .get<CourseProps[]>('/course')
      .then((response) => {
        const userCourses = response.data.filter((course) =>
          user.courseIds.includes(course.id),
        )

        setCourses(userCourses)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [token, user.courseIds])

  return (
    <AppLayout>
      <Styles.CoursesContainer>
        <h1>Meus cursos</h1>

        {isLoading ? (
          <div className="loading-wrapper">
            <Loading color={theme?.colors.white[500]} />
            <p>Carregando cursos</p>
          </div>
        ) : (
          <Styles.CoursesWrapper>
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="message-wrapper">
                <p>Você ainda não começou nenhum curso.</p>
                <p>
                  Para se inscrever em um cruso, vá até a <strong>Home</strong>{' '}
                  e escolha um curso!
                </p>
              </div>
            )}
          </Styles.CoursesWrapper>
        )}
      </Styles.CoursesContainer>
    </AppLayout>
  )
}
