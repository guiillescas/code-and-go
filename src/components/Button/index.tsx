import { IBM_Plex_Sans as IBMPlexSans } from 'next/font/google'

import * as Style from './styles'

import Loading from '../Loading'
import { ButtonProps } from './types'

const IBMSansPlex = IBMPlexSans({ subsets: ['latin'], weight: '500' })

export default function Button(props: ButtonProps) {
  return (
    <Style.ButtonContainer
      className={IBMSansPlex.className}
      disabled={props.isLoading}
      isLoading={props.isLoading}
      {...props}
    >
      {props.isLoading ? (
        <div className="loading-wrapper">
          <Loading />
        </div>
      ) : (
        props.children
      )}
    </Style.ButtonContainer>
  )
}
