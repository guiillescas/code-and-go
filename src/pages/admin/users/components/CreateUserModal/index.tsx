import { ReactElement, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import BaseModal from 'components/BaseModal'
import Button from 'components/Button'
import Input from 'components/inputs/input'

import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import * as Styles from './styles'

import { AdminUserProps } from '../EditUserModal/types'
import { CreateUserFormProps, CreateUsersModalProps } from './types'

const createUserSchema = Yup.object().shape({
  firstName: Yup.string().required(validationMessages.requiredField),
  lastName: Yup.string().required(validationMessages.requiredField),
  email: Yup.string().required(validationMessages.requiredField),
  password: Yup.string().required(validationMessages.requiredField),
})

export default function CreateUsersModal(
  props: CreateUsersModalProps,
): ReactElement {
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormProps>({
    resolver: yupResolver(createUserSchema),
  })

  function handleCreateUser(data: CreateUserFormProps) {
    setIsLoading(true)

    api(token)
      .post('/auth/register', data)
      .then((response) => {
        toast.success('Usuário criado com sucesso')

        const formattedUser: AdminUserProps = {
          id: response.data.id,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          profilePicture: response.data.profilePicture || null,
          role: response.data.role === 1 ? 'User' : 'Admin',
        }

        props.setUsers((prevState) => {
          return [...prevState, formattedUser]
        })

        props.onRequestClose()
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 400) {
          toast.warning('Já existe um usuário com este e-mail.')

          return
        }

        toast.error('Erro inesperado. Tente novamente mais tarde!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <BaseModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      title="Criar um usuário"
      maxWidth={700}
    >
      <Styles.CreateUsersModalContainer>
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <Input
            register={register}
            name="firstName"
            label="Primeiro nome"
            error={errors.firstName && errors.firstName.message}
          />
          <Input
            register={register}
            name="lastName"
            label="Último nome"
            error={errors.lastName && errors.lastName.message}
          />
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

          <Button type="submit" isLoading={isLoading}>
            Criar usuário
          </Button>
        </form>
      </Styles.CreateUsersModalContainer>
    </BaseModal>
  )
}
