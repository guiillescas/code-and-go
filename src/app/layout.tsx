import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import { globalStyles } from '@/styles/global'

import NavBar from 'components/NavBar'

import { getCssText } from '../styles'

import StitchesRegistry from './registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Code&Go',
  description: 'Aprenda programação de uma maneira divertida!',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  globalStyles()

  return (
    <html lang="pt-BR">
      <head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />

        <link href="utils/prism.css" rel="stylesheet" />
      </head>

      <body className={inter.className}>
        <NavBar />
        <StitchesRegistry>{children}</StitchesRegistry>
      </body>
    </html>
  )
}
