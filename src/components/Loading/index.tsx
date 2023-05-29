import { ReactElement } from 'react'

import * as Styles from './styles'

export default function Loading(): ReactElement {
  return (
    <Styles.LoadingContainer>
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
      <div className="dot" />
    </Styles.LoadingContainer>
  )
}
