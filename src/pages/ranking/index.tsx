import { ReactElement, useEffect, useState } from 'react'

import { CourseProps } from '@/hooks/useCourse/types'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Select from 'components/inputs/Select'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import AppLayout from 'layouts/AppLayout'

import * as Styles from './styles'

import { RankingProps } from './types'

interface FormProps {
  courseId: string
}

export default function Ranking(): ReactElement {
  const { token } = useAuth()

  const { register, watch } = useForm<FormProps>()

  const [ranking, setRanking] = useState<RankingProps>()
  const [courses, setCourses] = useState<CourseProps[]>([])

  function renderMedal(index: number) {
    switch (index) {
      case 0:
        return <span className="medal">&#x1F947;</span>
      case 1:
        return <span className="medal">&#x1F948;</span>
      case 2:
        return <span className="medal">&#x1F949;</span>
      default:
        return ''
    }
  }

  useEffect(() => {
    if (watch('courseId').length > 0) {
      api(token)
        .get(`/ranking/${watch('courseId')}`)
        .then((response) => {
          setRanking(response.data)
        })
        .catch(() => {
          toast.error('Erro inesperado ao carregar o ranking')
        })
    }
  }, [token, watch('courseId')])

  useEffect(() => {
    api(token)
      .get<CourseProps[]>('/course')
      .then((response) => {
        setCourses(response.data)
      })
  }, [token])

  console.log(ranking?.rankingProgresses)

  return (
    <AppLayout>
      <Styles.RankingContainer>
        <h1>Ranking</h1>

        <h2>Quanto mais você praticar, maior serão suas chances!</h2>

        <p>
          Ganhe pontos completando lições e acompanhe aqui sua colocação no
          ranking geral.
        </p>

        <form>
          <Select
            {...register('courseId')}
            label="Selecione um curso"
            options={[
              {
                id: '1',
                disabled: true,
                selected: true,
                name: 'Selecione um curso',
                value: '',
              },
              ...courses.map((course) => {
                return {
                  id: course.id,
                  name: course.name,
                  value: course.id,
                }
              }),
            ]}
          />
        </form>

        <div className="ranking">
          <h3>Ranking geral</h3>

          {ranking?.rankingProgresses?.map((position, index) => (
            <div className="position" key={position.id}>
              <p>
                <span className="index">{index + 1}</span>{' '}
                {position.userFullName} {renderMedal(index)}
              </p>

              <p>{position.points} pts</p>
            </div>
          ))}
        </div>
      </Styles.RankingContainer>
    </AppLayout>
  )
}
