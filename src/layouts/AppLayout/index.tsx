import { ReactElement } from 'react'

import NavBar from '@/components/NavBar'

import * as Styles from './styles'

import { AppLayoutProps } from './types'

export default function AppLayout(props: AppLayoutProps): ReactElement {
  return (
    <Styles.AppLayoutContainer>
      <NavBar />

      <div className="children">{props.children}</div>
    </Styles.AppLayoutContainer>
  )
}
