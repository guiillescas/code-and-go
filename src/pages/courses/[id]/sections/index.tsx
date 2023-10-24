import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { toast } from 'react-toastify'

import ModuleCard from 'components/InlineCard'

import { useAuth } from 'hooks/useAuth'
import { useCourse } from 'hooks/useCourse'
import { CourseProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import AppLayout from 'layouts/AppLayout'

import * as Styles from './styles'

import { RankingProgressesProps } from './types'

export default function Course(): ReactElement {
  const { token } = useAuth()
  const { course, setCourse } = useCourse()

  const router = useRouter()

  const [ranking, setRanking] = useState<RankingProgressesProps[]>([])
  const [
    idsOfFinishedSectionsAndCurrentSection,
    setIdsOfFinishedSectionsAndCurrentSection,
  ] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

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

  useEffect(() => {
    if (course) {
      api(token)
        .get(`/ranking/${course.id}`)
        .then((response) => {
          setRanking(response.data.rankingProgresses)
        })
        .catch(() => {
          toast.error('Erro inesperado ao carregar o ranking')
        })
    }
  }, [router.query.id, token, course])

  useEffect(() => {
    if (course) {
      setIsLoading(true)

      api(token)
        .get(`/progress/${course?.id}`)
        .then((response) => {
          setIdsOfFinishedSectionsAndCurrentSection([
            ...response.data.completedSectionIds,
            response.data.currentSectionId,
          ])
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [course, token])

  return (
    <AppLayout>
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
                disabled={
                  !idsOfFinishedSectionsAndCurrentSection.includes(section.id)
                }
              />
            ))}
          </div>
        </section>
      </Styles.CourseContainer>
    </AppLayout>
  )
}
