import { ReactElement } from 'react'

import * as Styles from './styles'

import { CounterProps } from './types'

export default function Counter(props: CounterProps): ReactElement {
  return (
    <Styles.CounterContainer>
      <p>{props.couter}</p>

      {props.icon}
    </Styles.CounterContainer>
  )
}
