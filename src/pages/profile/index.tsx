import Image from 'next/image'
import { ReactElement, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { GetServerSidePropsContext } from 'next'
import nookies, { parseCookies, setCookie } from 'nookies'
import { useForm } from 'react-hook-form'
import { MdOutlineHideImage } from 'react-icons/md'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Button from 'components/Button'
import CheckboxInput from 'components/inputs/CheckboxInput'
import Input from 'components/inputs/input'

import { cookies as cookiesNames } from 'constants/cookies'
import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import * as Styles from './styles'

import { FormProps } from './types'

const profileSchema = Yup.object().shape({
  name: Yup.string().required(validationMessages.requiredField),
  email: Yup.string()
    .email(validationMessages.validEmail)
    .required(validationMessages.requiredField),
  isPrivate: Yup.boolean(),
})

export default function Profile(): ReactElement {
  const { user, setUser, token } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit } = useForm<FormProps>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user.firstName,
      email: user.email,
      isPrivate: user.visibility === 2,
    },
  })

  function updateProfile(data: FormProps) {
    setIsLoading(true)

    const formattedUser = {
      firstName: data.name,
      lastName: 'data.name',
      visibility: data.isPrivate ? 2 : 1,
      bio: '',
      email: data.email,
    }

    api(token)
      .post(`/user/${user.id}/edit`, formattedUser)
      .then((response) => {
        toast.success('Perfil atualizado com sucesso')

        setUser(response.data)

        nookies.set(
          undefined,
          cookiesNames.user,
          JSON.stringify(response.data),
          {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          },
        )
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Styles.ProfileContainer>
      <div className="profile-picture-wrapper">
        {!user.firstName ? (
          <Image src="" alt={`Imagem de perfil de ${user.firstName}`} />
        ) : (
          <MdOutlineHideImage size={28} />
        )}
      </div>

      <form onSubmit={handleSubmit(updateProfile)}>
        <h2>Informações do perfil</h2>

        <p>
          <strong>Seu ID: </strong>
          {user.id}
        </p>

        <Input register={register} name="name" label="Nome" />
        <Input register={register} name="email" label="E-mail" type="email" />
        <CheckboxInput
          {...register('isPrivate')}
          id="isPrivate"
          name="isPrivate"
          label="Perfil privado"
        />

        <Button type="submit" isLoading={isLoading}>
          Salvar alterações
        </Button>
      </form>
    </Styles.ProfileContainer>
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
