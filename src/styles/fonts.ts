import { Baloo_2 as Baloo2, Ubuntu } from '@next/font/google'

export const primary = Ubuntu({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const secondary = Baloo2({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
})
