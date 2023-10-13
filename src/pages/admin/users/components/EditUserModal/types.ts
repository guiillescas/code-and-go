import { Dispatch, SetStateAction } from 'react'

export interface AdminUserProps {
  email: string
  firstName: string
  id: string
  lastName: string
  profilePicture: null | string
  role: string
}

export interface EditUsersModalProps {
  isOpen: boolean
  onRequestClose: () => void
  user: AdminUserProps | null
  handleEditUser: (user: AdminUserProps) => void
  setUsers: Dispatch<SetStateAction<AdminUserProps[]>>
}

export interface EditUserFormProps {
  role: string
}
