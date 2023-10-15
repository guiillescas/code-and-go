import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { FiArrowLeft } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { separateNames } from 'utils/separateNames'
import * as Yup from 'yup'

import Button from 'components/Button'
import Input from 'components/inputs/input'

import { validationMessages } from 'constants/validationMessages'

import { api } from 'services/api'

import * as Styles from './styles'

import { FormProps } from './types'

const loginSchema = Yup.object().shape({
  name: Yup.string().required(validationMessages.requiredField),
  email: Yup.string()
    .email(validationMessages.validEmail)
    .required(validationMessages.requiredField),
  password: Yup.string().required(validationMessages.requiredField),
  passwordConfirmation: Yup.string().test(
    'passwords-match',
    validationMessages.passwordsMustMatch,
    function (value) {
      return this.parent.password === value
    },
  ),
})

export default function Login(): ReactElement {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(loginSchema),
  })

  function handleRegister(data: FormProps) {
    setIsLoading(true)

    if (data.name.split(' ').length <= 1) {
      toast.warning('insira pelo menos 2 nomes')
      setIsLoading(false)

      return
    }

    const { firstName, lastName } = separateNames(data.name)

    const formattedData = {
      firstName,
      lastName,
      email: data.email,
      password: data.password,
    }

    api()
      .post('/auth/register', formattedData)
      .then(() => {
        toast.success('Conta criada com sucesso!')

        router.push('/login')
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 400) {
          toast.error('E-mail já cadastrado.')

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
        <h1>Registre-se</h1>

        <Link href="/login">
          <FiArrowLeft />
          Voltar para login
        </Link>

        <form onSubmit={handleSubmit(handleRegister)}>
          <Input
            register={register}
            name="name"
            label="Nome"
            error={errors.name && errors.name.message}
          />
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
          <Input
            register={register}
            name="passwordConfirmation"
            label="Confirme sua senha"
            type="password"
            error={
              errors.passwordConfirmation && errors.passwordConfirmation.message
            }
          />

          <Button isLoading={isLoading} type="submit">
            Fazer registro
          </Button>
        </form>
      </div>
    </Styles.LoginContainer>
  )
}
