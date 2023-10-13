import { ReactElement, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import BaseModal from 'components/BaseModal'
import Button from 'components/Button'
import Select from 'components/inputs/Select'

import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import * as Styles from './styles'

import { EditUserFormProps, EditUsersModalProps } from './types'

const editUserSchema = Yup.object().shape({
  role: Yup.string().required(validationMessages.requiredField),
})

export default function EditUsersModal(
  props: EditUsersModalProps,
): ReactElement {
  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUserFormProps>({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      role: props.user?.role,
    },
  })

  useEffect(() => {
    if (props.user?.role) {
      setValue('role', props.user?.role)
    }
  }, [props.user?.role])

  function handleEditUser(data: EditUserFormProps) {
    setIsLoading(true)

    const formattedRole = data.role === 'Admin' ? 2 : 1

    api(token)
      .put(`/user/admin/${props.user?.id}/transform/${formattedRole}`)
      .then((response) => {
        toast.success('Permissão alterada com sucesso')

        props.onRequestClose()

        props.setUsers((prevState) => {
          return prevState.map((user) => {
            if (user.id === props.user?.id) {
              return {
                ...user,
                role: data.role,
              }
            }

            return user
          })
        })
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
      title="Editar usuário"
      maxWidth={700}
    >
      <Styles.EditUsersModalContainer>
        {props.user && (
          <form onSubmit={handleSubmit(handleEditUser)}>
            <p>
              <strong>Nome: </strong>
              {props.user.firstName} {props.user.lastName}
            </p>
            <p>
              <strong>E-mail: </strong>
              {props.user.email} {props.user.lastName}
            </p>

            <Select
              {...register('role')}
              label="Role"
              options={[
                { id: '1', name: 'Admin', value: 'Admin' },
                { id: '2', name: 'User', value: 'User' },
              ]}
              error={errors.role && errors.role.message}
            />

            <Button type="submit" isLoading={isLoading}>
              Salvar alterações
            </Button>
          </form>
        )}
      </Styles.EditUsersModalContainer>
    </BaseModal>
  )
}
