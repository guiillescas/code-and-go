import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Button from 'components/Button'
import Input from 'components/inputs/input'

import { validationMessages } from 'constants/validationMessages'

import * as Styles from './styles'

import { FormProps } from './types'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(validationMessages.validEmail)
    .required(validationMessages.requiredField),
  password: Yup.string().required(validationMessages.requiredField),
})

export default function Login(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(loginSchema),
  })

  function handleLogin() {
    console.log('login')
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
            error={errors.email && errors.email.message}
          />
          <Input
            register={register}
            name="password"
            label="Senha"
            type="password"
            error={errors.password && errors.password.message}
          />

          <div className="recover-password">
            <Link href="/recover-password">Recuperar senha</Link>
          </div>

          <Button type="submit">Entrar</Button>
        </form>

        <div className="or">
          <div></div>
          <p>ou</p>
          <div></div>
        </div>

        <div className="social-medias-buttons">
          <button type="button">
            <Image
              src="/google-logo.png"
              alt="Logo do Google"
              width={24}
              height={24}
            />
          </button>
        </div>

        <div className="register-wrapper">
          <p>
            Não tem uma conta? <Link href="/register">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </Styles.LoginContainer>
  )
}
