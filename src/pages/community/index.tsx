import { ReactElement, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import nookies from 'nookies'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Button from 'components/Button'
import Input from 'components/inputs/input'
import FriendshipRequestCard from 'pages/profile/components/FriendshipRequestCard'

import { cookies as cookiesNames } from 'constants/cookies'
import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import * as Styles from './styles'

import { FormProps } from './types'

const communitySchema = Yup.object().shape({
  otherUserId: Yup.string().required(validationMessages.requiredField),
})

export default function Community(): ReactElement {
  const { user, setUser, token } = useAuth()

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
        message: null,
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

  async function handleResponseFriendship(
    response: number,
    requesterId: string,
    requestId: string,
  ) {
    api(token)
      .post(`/user/${requesterId}/request/${requestId}/response`, {
        Response: response,
      })
      .then((res) => console.log(res))
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde.')
      })
  }

  useEffect(() => {
    api(token)
      .get(`/user/${user.id}`)
      .then((response) => {
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
  }, [setUser, token, user.id])

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

        {user.friendshipRequests?.length > 0 ? (
          user.friendshipRequests.map((friendshipRequest) => (
            <FriendshipRequestCard
              key={friendshipRequest.id}
              id={friendshipRequest.id}
              message={friendshipRequest.message}
              name={friendshipRequest.requesterId}
              profilePicture={''}
              requesterId={friendshipRequest.requesterId}
              handleResponseFriendship={handleResponseFriendship}
            />
          ))
        ) : (
          <p>Você não tem nenhum pedido de amizade pendente.</p>
        )}
      </section>
    </Styles.CommunityContainer>
  )
}
