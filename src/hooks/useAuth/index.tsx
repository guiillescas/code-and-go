import { useRouter } from 'next/router'
import { createContext, useContext, useState } from 'react'

import nookies, { destroyCookie, parseCookies } from 'nookies'

import { cookies as cookiesNames } from 'constants/cookies'

import { AuthContextData, AuthProviderProps, UserProps } from './types'

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

  function updateUser(user: UserProps) {
    setUser(user)

    nookies.set(undefined, cookiesNames.user, JSON.stringify(user), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    })
  }

  function logout() {
    destroyCookie(undefined, cookiesNames.token)
    destroyCookie(undefined, cookiesNames.user)

    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, setToken, updateUser, logout }}
    >
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
