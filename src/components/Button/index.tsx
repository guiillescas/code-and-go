import { IBM_Plex_Sans as IBMPlexSans } from 'next/font/google'

import * as Style from './styles'

import Loading from '../Loading'
import { ButtonProps, ButtonVariantsEnum } from './types'
import { useTheme } from 'styled-components'

const IBMSansPlex = IBMPlexSans({ subsets: ['latin'], weight: '500' })

export default function Button(props: ButtonProps) {
  const { variant = ButtonVariantsEnum.DEFAULT } = props

  const theme = useTheme()

  return (
    <Style.ButtonContainer
      className={IBMSansPlex.className}
      disabled={props.isLoading}
      isLoading={props.isLoading}
      variant={variant}
      {...props}
    >
      {props.isLoading ? (
        <div className="loading-wrapper">
          <Loading color={theme?.colors.white[500]} width={24} height={24} />
        </div>
      ) : (
        props.children
      )}
    </Style.ButtonContainer>
  )
}
