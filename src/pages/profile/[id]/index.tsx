import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { api } from '@/services/api'
import { GetServerSidePropsContext } from 'next'
import { parseCookies, setCookie } from 'nookies'
import { MdOutlineHideImage } from 'react-icons/md'

import { cookies as cookiesNames } from 'constants/cookies'

import { useAuth } from 'hooks/useAuth'

import AppLayout from 'layouts/AppLayout'

import * as Styles from './styles'

export default function Profile(): ReactElement {
  const router = useRouter()

  const { user, token } = useAuth()

  useEffect(() => {
    api(token)
      .get(`'/user/${router.query.id as string}`)
      .then((response) => {
        console.log(response.data)
      })
  }, [router.query.id, token])

  return (
    <AppLayout>
      <Styles.ProfileContainer>
        <div className="profile-picture-wrapper">
          {!user.firstName ? (
            <Image src="" alt={`Imagem de perfil de ${user.firstName}`} />
          ) : (
            <MdOutlineHideImage size={28} />
          )}
        </div>

        <h2>Informações do perfil</h2>

        <p>
          <strong>Nome: </strong>
        </p>
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
