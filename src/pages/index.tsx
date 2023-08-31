import { GetServerSidePropsContext } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { FiPlay } from 'react-icons/fi'

import { cookies as cookiesNames } from 'constants/cookies'

import { useAuth } from 'hooks/useAuth'

import * as Styles from './styles'

export default function Home() {
  const { user } = useAuth()

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

        <Styles.HomeIntroCard>
          <h2>Continue de onde você parou</h2>

          <button type="button" title="Assistir a aula">
            Continuar aula
            <FiPlay />
          </button>
        </Styles.HomeIntroCard>
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
