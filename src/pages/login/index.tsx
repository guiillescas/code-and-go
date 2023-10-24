import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
import nookies, { destroyCookie, parseCookies } from 'nookies'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Button from 'components/Button'
import Input from 'components/inputs/input'

import { cookies as cookiesNames } from 'constants/cookies'
import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'
import { LoginRequestProps } from 'hooks/useAuth/types'

import { api } from 'services/api'

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
  const { setUser, setToken } = useAuth()

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

    api()
      .post<LoginRequestProps>('/auth/login', {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`

        setUser(response.data.user)
        setToken(response.data.token)

        nookies.set(
          undefined,
          cookiesNames.user,
          JSON.stringify(response.data.user),
          {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          },
        )
        nookies.set(undefined, cookiesNames.token, `${response.data.token}`, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })

        router.push('/')
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 400) {
          toast.warning('E-mail ou senha inválidos')

          return
        }

        toast.error('Erro inesperado. Tente novamente mais tarde!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Styles.LoginContainer>
      <div>
        <h1>Faça seu login</h1>

        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            register={register}
            name="email"
            label="E-mail"
            type="email"
            error={errors.email && errors.email.message}
          />
          <Input
            register={register}
            name="password"
            label="Senha"
            type="password"
            error={errors.password && errors.password.message}
          />

          {/* <div className="recover-password">
            <Link href="/recover-password">Recuperar senha</Link>
          </div> */}

          <Button isLoading={isLoading} type="submit">
            Entrar
          </Button>
        </form>

        <div className="register-wrapper">
          <p>
            Não tem uma conta? <Link href="/register">Cadastre-se</Link>
          </p>
        </div>
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
