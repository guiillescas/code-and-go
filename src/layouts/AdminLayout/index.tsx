import { ReactElement } from 'react'

import AdminNavBar from 'components/@admin/NavBar'

import * as Styles from './styles'

import { AdminLayoutProps } from './types'

export default function AdminLayout(props: AdminLayoutProps): ReactElement {
  return (
    <Styles.AdminLayoutContainer>
      <AdminNavBar />

      <div className="children">{props.children}</div>
    </Styles.AdminLayoutContainer>
  )
}
