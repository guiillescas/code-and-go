import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

import axios from 'axios'
import nookies, { destroyCookie, parseCookies } from 'nookies'
import { toast } from 'react-toastify'

import { cookies as cookiesNames } from 'constants/cookies'

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

  const [user, setUser] = useState<UserProps>(() => {
    const cookies = parseCookies()

    const userFromCookies = cookies[cookiesNames.user]

    if (userFromCookies) {
      return JSON.parse(userFromCookies)
    }

    return {} as UserProps
  })
  const [token, setToken] = useState<string>(() => {
    const cookies = parseCookies()

    const tokenFromCookies = cookies[cookiesNames.token]

    if (tokenFromCookies) {
      return tokenFromCookies
    }

    return ''
  })

  async function login({ email, password }: LoginProps) {
    try {
      const loginResponse = await api().post<LoginRequestProps>('/auth/login', {
        email,
        password,
      })

      axios.defaults.headers.common.Authorization = `Bearer ${loginResponse.data.token}`

      const userData = await api(loginResponse.data.token).get<UserProps>(
        `/user/${loginResponse.data.userId}`,
      )

      setUser(userData.data)

      setToken(loginResponse.data.token)

      nookies.set(undefined, cookiesNames.user, JSON.stringify(userData.data), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })
      nookies.set(
        undefined,
        cookiesNames.token,
        `${loginResponse.data.token}`,
        {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        },
      )
    } catch (error: any) {
      console.log(error.response)

      if (error.response?.status === 400) {
        toast.error('E-mail ou senha iválidos.')

        return
      }

      toast.error('Erro inesperado. Tente novamente mais tarde.')

      throw new Error(error)
    }
  }

  function logout() {
    destroyCookie(undefined, cookiesNames.token)
    destroyCookie(undefined, cookiesNames.user)

    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, token, setToken, login, logout }}>
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
