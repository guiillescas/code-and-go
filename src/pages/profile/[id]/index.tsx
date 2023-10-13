import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import Button from '@/components/Button'
import { ButtonVariantsEnum } from '@/components/Button/types'
import { GetServerSidePropsContext } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { AiFillFire } from 'react-icons/ai'
import { FiArrowLeft } from 'react-icons/fi'
import { MdOutlineHideImage } from 'react-icons/md'
import { useTheme } from 'styled-components'

import { cookies as cookiesNames } from 'constants/cookies'

import { useAuth } from 'hooks/useAuth'
import { UserProps } from 'hooks/useAuth/types'

import { api } from 'services/api'

import AppLayout from 'layouts/AppLayout'

import * as Styles from './styles'

export default function Profile(): ReactElement {
  const router = useRouter()
  const theme = useTheme()

  const { user, token } = useAuth()

  const [userProfile, setUserProfile] = useState<UserProps>()

  useEffect(() => {
    api(token)
      .get(`/user/${router.query.id as string}`)
      .then((response) => {
        setUserProfile(response.data)
      })
  }, [router.query.id, token])

  return (
    <AppLayout>
      <Styles.ProfileContainer>
        <Button
          onClick={() => router.back()}
          variant={ButtonVariantsEnum.SECONDARY}
        >
          <FiArrowLeft /> Voltar
        </Button>

        <section>
          <div className="profile-picture-wrapper">
            {userProfile?.profilePicture ? (
              <Image
                src={userProfile.profilePicture}
                alt={`Imagem de perfil de ${user.firstName}`}
              />
            ) : (
              <MdOutlineHideImage size={28} />
            )}
          </div>

          <div className="info">
            <h2>Informações do perfil de {userProfile?.firstName}</h2>

            <p>
              <strong>Nome: </strong> {userProfile?.firstName}{' '}
              {userProfile?.lastName}
            </p>
            <p>
              <strong>E-mail: </strong> {userProfile?.email}
            </p>
            <p>
              <strong>Bio: </strong> {userProfile?.bio}
            </p>

            <div className="streak">
              <p>
                <strong>Streak counter: </strong>
              </p>

              <span>
                {userProfile?.streakCount}
                <AiFillFire size={20} color={theme?.colors.green[500]} />
              </span>
            </div>
          </div>
        </section>
      </Styles.ProfileContainer>
    </AppLayout>
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
