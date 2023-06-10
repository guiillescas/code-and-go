import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import * as Styles from './styles'

import { ModuleCardProps } from './types'

export default function ModuleCard(props: ModuleCardProps): ReactElement {
  const router = useRouter()

  function handleOnClickCard() {
    router.push('/')
  }

  return (
    <Styles.ModuleCardContainer onClick={handleOnClickCard}>
      <h3>{props.title}</h3>
    </Styles.ModuleCardContainer>
  )
}
