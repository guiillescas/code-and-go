import { ReactElement } from 'react'

import * as Styles from './styles'

import { InlineCardProps } from './types'

export default function InlineCard(props: InlineCardProps): ReactElement {
  return (
    <Styles.InlineCardContainer onClick={props.handleOnClickCard}>
      <h3>{props.section.name}</h3>

      <p>{props.section.description}</p>
    </Styles.InlineCardContainer>
  )
}
