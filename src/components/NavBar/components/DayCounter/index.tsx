import { ReactElement } from 'react'

import { AiFillFire } from 'react-icons/ai'
import { useTheme } from 'styled-components'

import * as Styles from './styles'

import { DayCounterProps } from './types'

export default function DayCounter(props: DayCounterProps): ReactElement {
  const theme = useTheme()

  return (
    <Styles.DayCounterContainer>
      <p>{props.couter}</p>

      <AiFillFire color={theme?.colors.green[500]} />
    </Styles.DayCounterContainer>
  )
}
