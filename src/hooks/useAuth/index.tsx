import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

import nookies, { destroyCookie } from 'nookies'
import { toast } from 'react-toastify'

import { cookies } from 'constants/cookies'

import { api } from 'services/api'

import {
  AuthContextData,
  AuthProviderProps,
  LoginProps,
  LoginRequestProps,
  UserProps,
} from './types'

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()

  const [user, setUser] = useState({} as UserProps)

  async function login({ email, password }: LoginProps) {
    try {
      const response = await api.post<LoginRequestProps>('/auth/login', {
        email,
        password,
      })

      const userData = {
        id: response.data.userId,
        firstName: response.data.firstName,
        email: response.data.email,
      }

      setUser(userData)

      nookies.set(undefined, cookies.user, JSON.stringify(userData), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      nookies.set(undefined, cookies.token, `Bearer ${response.data.token}`, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error('E-mail ou senha iválidos.')

        return
      }

      toast.error('Erro inesperado. Tente novamente mais tarde.')

      throw new Error(error)
    }
  }

  function logout() {
    destroyCookie(undefined, cookies.token)
    destroyCookie(undefined, cookies.user)

    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export default AuthContext
