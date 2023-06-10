import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import NavBar from '@/components/NavBar'
import { LayoutGroup } from 'framer-motion'
import Modal from 'react-modal'
import { ThemeProvider } from 'styled-components'

import * as Styles from 'styles/pages/app'

import { primary } from 'styles/fonts'
import { GlobalStyles } from 'styles/global'
import { theme } from 'styles/themes/default'

import Loading from './loading'

Modal.setAppElement('#__next')

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname ? setIsLoading(true) : setIsLoading(false)
    }

    const handleComplete = () => {
      setIsLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)
  }, [router])

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Code&go</title>
      </Head>
      <GlobalStyles theme={theme} />

      <LayoutGroup>
        <Styles.AppContainer className={primary.className}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <NavBar />

              <Component {...pageProps} />
            </>
          )}
        </Styles.AppContainer>
      </LayoutGroup>
    </ThemeProvider>
  )
}

export default MyApp
