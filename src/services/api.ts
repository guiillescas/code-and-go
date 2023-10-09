import { redirect } from 'next/navigation'

import axios, { AxiosError, AxiosInstance } from 'axios'
import { destroyCookie, parseCookies } from 'nookies'

import { cookies } from 'constants/cookies'

export const createAxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

export function api(token?: string): AxiosInstance {
  const userCookies = parseCookies()

  // const token = userCookies[cookies.token]

  const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Access-Control-Allow-Origin': '*',
    },
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError) => {
      if (!error.response) {
        return Promise.reject(error)
      }

      if (error.response.status === 401) {
        destroyCookie(undefined, cookies.token)
        destroyCookie(undefined, cookies.user)

        redirect('/login')
      }

      return Promise.reject(error)
    },
  )

  return axiosInstance
}
