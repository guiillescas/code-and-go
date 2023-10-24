import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { MdOutlineHideImage } from 'react-icons/md'
import { toast } from 'react-toastify'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import * as Styles from './styles'

import Counter from '../Counter'
import { FriendsProps } from './types'

export default function RightBar(): ReactElement {
  const { user, token, updateUser } = useAuth()
  const router = useRouter()

  const [isClient, setIsClient] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [friends, setFriends] = useState<FriendsProps[]>([])

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    api(token)
      .get(`/user/${user.id}`)
      .then((response) => {
        updateUser(response.data)
      })

    api(token)
      .get('/user/friends')
      .then((response) => {
        setFriends([
          ...response.data,
          {
            id: '123',
            firstName: 'Guilherme',
            lastName: 'Arthur Leimann Illescas',
            points: 900,
          },
        ])
      })
      .catch(() => {
        console.log('Erro inesperado')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [router.asPath])

  return (
    <Styles.RightBarContainer>
      <div className="image-wrapper">
        {user.profilePicture ? (
          <Image
            src={user.profilePicture}
            alt={`Imagem de perfil de ${user.profilePicture}`}
            width={180}
            height={180}
          />
        ) : (
          <MdOutlineHideImage size={28} />
        )}
      </div>

      <h2>{isClient && user.firstName}</h2>

      <div className="box">
        <div className="counters">
          <Counter counter={isClient ? user.lifeCount : 0} icon="&#x2615;" />
          <Counter counter={isClient ? user.streakCount : 0} icon="&#x1F525;" />
        </div>
      </div>

      <div className="box">
        <h3>Amigos</h3>

        <div className="friends-wrapper">
          {friends.length > 0 ? (
            friends.map((friend) => (
              <div className="friend" key={friend.id}>
                <p>
                  {friend.firstName} {friend.lastName}
                </p>

                <span>{friend.points} pts</span>
              </div>
            ))
          ) : (
            <p>Nenhum amigo com pontos</p>
          )}
        </div>
      </div>
    </Styles.RightBarContainer>
  )
}
