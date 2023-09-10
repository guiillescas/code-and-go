import { ReactElement, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Button from 'components/Button'
import Input from 'components/inputs/input'

import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import * as Styles from './styles'

import { FormProps } from './types'

const communitySchema = Yup.object().shape({
  otherUserId: Yup.string().required(validationMessages.requiredField),
})

export default function Community(): ReactElement {
  const { user, token } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(communitySchema),
  })

  function handleSubmitFriendship(data: FormProps) {
    setIsLoading(true)

    api(token)
      .post(`/user/${user.id}/request/${data.otherUserId}`, {
        message: 'Vamos ser amigos?',
      })
      .then(() => {
        toast.success('Pedido de amizade enviado com sucesso!')
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Styles.CommunityContainer>
      <section id="add-friend">
        <form onSubmit={handleSubmit(handleSubmitFriendship)}>
          <h2>Adicionar amigo</h2>

          <div>
            <Input
              register={register}
              name="otherUserId"
              label="ID do seu amigo"
              error={errors.otherUserId && errors.otherUserId.message}
            />

            <Button type="submit" isLoading={isLoading}>
              Enviar pedido de amizade
            </Button>
          </div>
        </form>
      </section>

      <section id="friends-requests">
        <h2>Pedidos de amizade</h2>

        <p>Você não tem nenhum pedido de amizade pendente.</p>
      </section>
    </Styles.CommunityContainer>
  )
}
