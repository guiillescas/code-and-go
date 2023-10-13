import { Dispatch, SetStateAction } from 'react'

import { AdminUserProps } from '../EditUserModal/types'

export interface CreateUsersModalProps {
  isOpen: boolean
  onRequestClose: () => void
  setUsers: Dispatch<SetStateAction<AdminUserProps[]>>
}

export interface CreateUserFormProps {
  firstName: string
  lastName: string
  email: string
  password: string
}
