import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import InlineCard from 'components/InlineCard'

import { useAuth } from 'hooks/useAuth'
import { useCourse } from 'hooks/useCourse'
import { CourseProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import * as Styles from './styles'

export default function Course(): ReactElement {
  const router = useRouter()

  const { token } = useAuth()
  const { course, setCourse, setBreadcrumb } = useCourse()

  // useEffect(() => {
  //   if (!course) {
  //     const courseId = router.query.id
  //     // getCourse(courseId)
  //   }

  //   setBreadcrumb([
  //     {
  //       id: 1,
  //       title: `${course?.name}`,
  //       link: `/courses/${course?.id}`,
  //     },
  //   ])
  // }, [course, router.query.id, setBreadcrumb, setCourse])

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

  const sectionId = router.query.sectionId
  const modules = course?.sections.find(
    (section) => section.id === sectionId,
  )?.modules

  return (
    <Styles.CourseContainer>
      <section>
        <h1>Curso de {course?.name}</h1>

        {/* <Breadcrumb menus={breadcrumb} /> */}

        <div className="content">
          <h2>Módulos</h2>

          {modules?.map((module) => {
            function handleOnClickCard() {
              router.push(
                `/courses/${course?.id}/sections/${sectionId}/modules/${module.id}`,
              )
            }

            return (
              <InlineCard
                key={module.id}
                name={module.name}
                description={''}
                handleOnClickCard={handleOnClickCard}
              />
            )
          })}
        </div>
      </section>
    </Styles.CourseContainer>
  )
}
