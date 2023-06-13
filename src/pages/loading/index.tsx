
import { ReactElement } from 'react'
import { Boogaloo } from '@next/font/google'

import * as Styles from './styles'
import Loading from '@/components/Loading'
import { useTheme } from 'styled-components'

const Font = Boogaloo({ subsets: ['latin'], weight: '400' })

export default function LoadingPage(): ReactElement {
  const theme = useTheme()

  return (
    <Styles.LoadingContainer>
      <p className={Font.className}>Code&go</p>

      <Loading color={theme?.colors.white[500]} />
    </Styles.LoadingContainer>
  )
}
