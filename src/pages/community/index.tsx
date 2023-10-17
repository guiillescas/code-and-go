import Image from 'next/image'
import Link from 'next/link'
import { ReactElement, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import nookies from 'nookies'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Button from 'components/Button'
import { ButtonVariantsEnum } from 'components/Button/types'
import Input from 'components/inputs/input'
import FriendshipRequestCard from 'pages/profile/components/FriendshipRequestCard'

import { cookies as cookiesNames } from 'constants/cookies'
import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import AppLayout from 'layouts/AppLayout'

import * as Styles from './styles'

import {
  FormProps,
  PossibleFriendsProps,
  PossibleFriendsListProps,
} from './types'

const communitySchema = Yup.object().shape({
  studentName: Yup.string().required(validationMessages.requiredField),
})

export default function Community(): ReactElement {
  const { user, setUser, token } = useAuth()

  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [isFriendRequestLoading, setIsFriendRequestLoading] = useState(false)
  const [isToShowNotFriendsMessage, setIsToShowNotFriendsMessage] =
    useState(false)

  const [possibleFriends, setPossibleFriends] = useState<
    PossibleFriendsListProps[]
  >([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormProps>({
    resolver: yupResolver(communitySchema),
  })

  function handleSearchUserByName(data: FormProps) {
    setIsSearchLoading(true)

    api(token)
      .get(`/user/list?page=1&pagesize=10&name=${data.studentName}`)
      .then((response) => {
        const formattedPossibleFriends = response.data.data
          .map((possibleFriend: PossibleFriendsProps) => {
            return {
              ...possibleFriend,
              isRequested: false,
            }
          })
          .filter(
            (possibleFriend: PossibleFriendsProps) =>
              possibleFriend.id !== user.id,
          )
        setPossibleFriends(formattedPossibleFriends)

        setIsToShowNotFriendsMessage(true)
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde.')
      })
      .finally(() => {
        setIsSearchLoading(false)
      })
  }

  function handleSubmitFriendship(friendId: string) {
    setIsFriendRequestLoading(true)

    api(token)
      .post(`/user/${user.id}/request/${friendId}`, {
        message: null,
      })
      .then(() => {
        setPossibleFriends((prevState) => {
          return prevState.map((possibleFriend) => {
            if (possibleFriend.id === friendId) {
              return {
                ...possibleFriend,
                isRequested: true,
              }
            } else {
              return possibleFriend
            }
          })
        })

        toast.success('Pedido de amizade enviado com sucesso!')
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde.')
      })
      .finally(() => {
        setIsFriendRequestLoading(false)
      })
  }

  function handleCancelSearch() {
    setIsToShowNotFriendsMessage(false)
    reset()
    setPossibleFriends([])
  }

  async function handleResponseFriendship(
    response: number,
    userId: string,
    requestId: string,
  ) {
    api(token)
      .post(`/user/${userId}/request/${requestId}/response`, {
        response,
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
    <AppLayout>
      <Styles.CommunityContainer>
        <section id="add-friend">
          <form onSubmit={handleSubmit(handleSearchUserByName)}>
            <h2>Adicionar amigo</h2>

            <div>
              <Input
                register={register}
                name="studentName"
                label="Procure pelo nome do seu amigo"
                error={errors.studentName && errors.studentName.message}
              />

              <Button type="submit" isLoading={isSearchLoading}>
                Procurar
              </Button>
              <Button
                variant={ButtonVariantsEnum.SECONDARY}
                onClick={handleCancelSearch}
              >
                Cancelar
              </Button>
            </div>
          </form>

          <div className="possible-friends-list-wrapper">
            {possibleFriends.length > 0 ? (
              possibleFriends.map((possibleFriend, index) => (
                <div key={possibleFriend.id} className="possible-friend-card">
                  <div>
                    <span>
                      <strong>{index + 1}</strong>
                    </span>

                    {possibleFriend.visibility === 1 ? (
                      <Link href={`/profile/${possibleFriend.id}`}>
                        {possibleFriend.firstName} {possibleFriend.lastName}
                      </Link>
                    ) : (
                      <p>
                        {possibleFriend.firstName} {possibleFriend.lastName}{' '}
                        (Perfil privado)
                      </p>
                    )}
                  </div>

                  <Button
                    onClick={() => handleSubmitFriendship(possibleFriend.id)}
                    isLoading={isFriendRequestLoading}
                    disabled={possibleFriend.isRequested}
                    variant={
                      possibleFriend.isRequested
                        ? ButtonVariantsEnum.PRIMARY
                        : ButtonVariantsEnum.DEFAULT
                    }
                  >
                    {possibleFriend.isRequested
                      ? 'Pedido enviado'
                      : 'Enviar pedido'}
                  </Button>
                </div>
              ))
            ) : isToShowNotFriendsMessage ? (
              <p>Nenhum amigo encontrado com esse nome</p>
            ) : (
              ''
            )}
          </div>
        </section>

        <section id="friends-requests">
          <div className="left">
            <h2>Pedidos de amizade</h2>

            {user.friendshipRequests?.length > 0 ? (
              user.friendshipRequests.map((friendshipRequest) => (
                <FriendshipRequestCard
                  key={friendshipRequest.id}
                  requestId={friendshipRequest.id}
                  message={friendshipRequest.message}
                  name={friendshipRequest.requesterEmail}
                  profilePicture={''}
                  handleResponseFriendship={handleResponseFriendship}
                />
              ))
            ) : (
              <p>Você não tem nenhum pedido de amizade pendente.</p>
            )}
          </div>
        </section>
      </Styles.CommunityContainer>
    </AppLayout>
  )
}
