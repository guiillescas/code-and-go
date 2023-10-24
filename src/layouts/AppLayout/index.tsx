import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import LeftBar from 'components/LeftBar'
import RightBar from 'components/RightBar'

import * as Styles from './styles'

import { AppLayoutProps } from './types'

export default function AppLayout(props: AppLayoutProps): ReactElement {
  const router = useRouter()

  return (
    <Styles.AppLayoutContainer>
      <LeftBar />

      <div className="children">{props.children}</div>

      {router.pathname !== '/profile' && <RightBar />}
    </Styles.AppLayoutContainer>
  )
}
