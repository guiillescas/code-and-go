import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import ModuleCard from 'components/InlineCard'

import { useAuth } from 'hooks/useAuth'
import { useCourse } from 'hooks/useCourse'
import { CourseProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import * as Styles from './styles'

export default function Course(): ReactElement {
  const { token, user } = useAuth()
  const { course, setCourse } = useCourse()

  const router = useRouter()

  function handleOnClickCard(sectionId: string) {
    router.push(`/courses/${course?.id}/sections/${sectionId}/modules`)
  }

  useEffect(() => {
    api(token)
      .get<CourseProps[]>('/course')
      .then((response) => {
        const course = response.data.filter(
          (course) => course.id === router.query.id,
        )

        setCourse(course[0])
      })
  }, [router.query.id, setCourse, token])

  return (
    <Styles.CourseContainer>
      <section>
        <h1>Curso de {course?.name}</h1>

        <div className="content">
          <h2>Seções</h2>

          {course?.sections.map((section) => (
            <ModuleCard
              key={section.id}
              name={section.name}
              description={section.description}
              handleOnClickCard={() => handleOnClickCard(section.id)}
            />
          ))}
        </div>
      </section>
    </Styles.CourseContainer>
  )
}
