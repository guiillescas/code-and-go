import Image from 'next/image'
import { ReactElement } from 'react'

import { useAuth } from '@/hooks/useAuth'
import { FiCheck, FiUser, FiX } from 'react-icons/fi'

import * as Styles from './styles'

import { FriendshipRequestCardProps } from './types'

export default function FriendshipRequestCard(
  props: FriendshipRequestCardProps,
): ReactElement {
  const { user } = useAuth()

  return (
    <Styles.FriendshipRequestCardContainer>
      <div>
        {props.profilePicture ? (
          <Image
            src={props.profilePicture}
            alt={`Imagem de ${props.name}`}
            width={40}
            height={40}
          />
        ) : (
          <div className="no-image-wrapper">
            <FiUser size={18} />
          </div>
        )}

        <p>{props.name}</p>
      </div>

      <div>
        <button
          type="button"
          className="confirm"
          onClick={() =>
            props.handleResponseFriendship(2, user.id, props.requestId)
          }
        >
          <FiCheck />
        </button>

        <button
          type="button"
          className="cancel"
          onClick={() =>
            props.handleResponseFriendship(3, user.id, props.requestId)
          }
        >
          <FiX />
        </button>
      </div>
    </Styles.FriendshipRequestCardContainer>
  )
}
