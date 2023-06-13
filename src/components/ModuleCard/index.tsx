import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import * as Styles from './styles'

import { ModuleCardProps } from './types'

export default function ModuleCard(props: ModuleCardProps): ReactElement {
  const router = useRouter()

  function handleOnClickCard() {
    router.push(`/courses/${props.courseId}/module/${props.id}`)
  }

  return (
    <Styles.ModuleCardContainer onClick={handleOnClickCard}>
      <h3>{props.title}</h3>
      <p>Esse curso vai abordar conceitos fundamentais do TypeScript. Com ele, você será capaz de criar interfaces, enums e types.</p>
    </Styles.ModuleCardContainer>
  )
}
