import { useEffect, useState } from 'react'

import { GetServerSidePropsContext } from 'next'
import { parseCookies, setCookie } from 'nookies'

import CourseCard from 'components/CourseCard'

import { cookies as cookiesNames } from 'constants/cookies'

import { useAuth } from 'hooks/useAuth'
import { CourseProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import * as Styles from './styles'

export default function Home() {
  const { user, token } = useAuth()

  const [courses, setCourses] = useState<CourseProps[]>([])

  useEffect(() => {
    api(token)
      .get<CourseProps[]>('/course')
      .then((response) => {
        setCourses(response.data)
      })
  }, [token])

  return (
    <Styles.HomeContainer>
      <section id="intro">
        <div className="welcome">
          <h1>
            {user.firstName ? 'Olá, ' : 'Olá! '}
            {user.firstName}
          </h1>

          <p>Que bom tê-lo aqui novamente</p>
        </div>

        {/* <Styles.HomeIntroCard>
          <h2>Continue de onde você parou</h2>

          <button type="button" title="Assistir a aula">
            Continuar aula
            <FiPlay />
          </button>
        </Styles.HomeIntroCard> */}
      </section>

      <section id="courses">
        <h2>Cursos disponíveis</h2>

        <Styles.CoursesWrapper>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </Styles.CoursesWrapper>
      </section>
    </Styles.HomeContainer>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = parseCookies(ctx)

  if (!cookies[cookiesNames.token]) {
    setCookie(ctx, 'isDirtyRedirect', JSON.stringify(true))

    return {
      redirect: {
        destination: '/login',
        message: 'alsdk',
      },
      props: {
        isDirty: true,
      },
    }
  }

  return {
    props: {},
  }
}
