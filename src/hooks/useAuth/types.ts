import { Dispatch, ReactNode, SetStateAction } from 'react'

interface FriendshipRequestProps {
  id: string
  requesterId: string
  message: string
}

export interface UserProps {
  bio: string | null
  courseIds: string[]
  email: string
  experiencePoints: number
  firstName: string
  friendIds: string[]
  friendshipRequests: FriendshipRequestProps[]
  id: string
  lastName: string
  level: string
  profilePicture: string | null
  streakCount: number
  visibility: number
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
  setUser: Dispatch<SetStateAction<UserProps>>
  token: string
  setToken: Dispatch<SetStateAction<string>>
  login: (props: LoginProps) => Promise<void>
  logout: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}
