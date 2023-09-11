import { ReactElement } from 'react'

import * as Styles from './styles'

import { InlineCardProps } from './types'

export default function InlineCard(props: InlineCardProps): ReactElement {
  return (
    <Styles.InlineCardContainer onClick={props.handleOnClickCard}>
      <h3>{props.name}</h3>

      <p>{props.description}</p>
    </Styles.InlineCardContainer>
  )
}
