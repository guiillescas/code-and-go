import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { GetServerSidePropsContext } from 'next'
import { signIn } from 'next-auth/react'
import { destroyCookie, parseCookies } from 'nookies'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'
import Input from 'components/inputs/input'

import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'

import * as Styles from './styles'

import { FormProps, LoginPageProps } from './types'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(validationMessages.validEmail)
    .required(validationMessages.requiredField),
  password: Yup.string().required(validationMessages.requiredField),
})

export default function Login(props: LoginPageProps): ReactElement {
  const router = useRouter()
  const { login } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(loginSchema),
  })

  async function handleLogin(data: FormProps) {
    setIsLoading(true)

    await login(data)
      .then(() => {
        router.push('/')
      })
      .catch(() => {
        console.log('Error')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Styles.LoginContainer>
      <div>
        <h1>Login de administradores</h1>

        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            register={register}
            name="email"
            label="E-mail"
            error={errors.email && errors.email.message}
          />
          <Input
            register={register}
            name="password"
            label="Senha"
            type="password"
            error={errors.password && errors.password.message}
          />

          <Button isLoading={isLoading} type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </Styles.LoginContainer>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = parseCookies(ctx)

  if (cookies.isDirtyRedirect) {
    destroyCookie(ctx, 'isDirtyRedirect')

    return {
      props: {
        isDirtyRedirect: true,
      },
    }
  }

  return {
    props: {
      isDirtyRedirect: false,
    },
  }
}
