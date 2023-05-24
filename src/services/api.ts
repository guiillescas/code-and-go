import { redirect } from 'next/navigation'

import axios, { AxiosError, AxiosInstance } from 'axios'
import { destroyCookie, parseCookies } from 'nookies'

import { cookies } from 'constants/cookies'

export function setupAPIClient(ctx = undefined): AxiosInstance {
  const userCookies = parseCookies()

  const token = userCookies[cookies.token]

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*',
    },
  })

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (!error.response) {
        return Promise.reject(error)
      }

      if (error.response.status === 401) {
        destroyCookie(undefined, cookies.token)

        redirect('/login')
      }
    },
  )

  return api
}

export const api = setupAPIClient()
