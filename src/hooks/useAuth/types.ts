import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface UserProps {
  bio: string | null
  courseIds: string[]
  email: string
  experiencePoints: number
  firstName: string
  friendIds: string[]
  // TODO - Arruamr tipagem
  friendshipRequests: any[]
  id: string
  lastName: string
  level: string
  profilePicture: string | null
  streakCount: number
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
  token: string
  setToken: Dispatch<SetStateAction<string>>
  login: (props: LoginProps) => Promise<void>
  logout: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}
