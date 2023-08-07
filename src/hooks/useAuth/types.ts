import { ReactNode } from 'react'

export interface UserProps {
  id: string
  firstName: string
  email: string
}

export interface LoginRequestProps {
  userId: string
  firstName: string
  email: string
  token: string
}

export interface LoginProps {
  email: string
  password: string
}

export interface AuthContextData {
  user: UserProps
  login: (props: LoginProps) => void
}

export interface AuthProviderProps {
  children: ReactNode
}
