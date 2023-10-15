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

interface RankingProgressesProps {
  id: string
  userId: string
  userFullName: string
  points: number
}

interface RankingProps {
  id: string
  period: {
    initialDateTime: string
    endDateTime: string
  }
  rankingProgresses: RankingProgressesProps[]
}

export default function Course(): ReactElement {
  const { token } = useAuth()
  const { course, setCourse } = useCourse()

  const router = useRouter()

  const [ranking, setRanking] = useState<RankingProgressesProps[]>([])

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
    api(token)
      .get(`/ranking/${router.query.id}`)
      .then((response) => {
        setRanking(response.data.rankingProgresses)
      })
      .catch(() => {
        toast.error('Erro inesperado ao carregar o ranking')
      })
  }, [router.query.id, token])

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
              />
            ))}
          </div>
        </section>

        {ranking.length > 0 && (
          <div className="ranking-wrapper">
            <h2>Ranking</h2>
            {ranking.map((rank, index) => (
              <div className="ranking" key={rank.id}>
                <Styles.RankingPosition>
                  <span>
                    <strong>{index + 1}º</strong>
                  </span>

                  <p>{rank.userFullName}</p>
                </Styles.RankingPosition>
              </div>
            ))}
          </div>
        )}
      </Styles.CourseContainer>
    </AppLayout>
  )
}
