import Link from 'next/link'
import { ReactElement } from 'react'

import * as Styles from './styles'

import { BreadcrumbProps } from './types'

export default function Breadcrumb(props: BreadcrumbProps): ReactElement {
  return (
    <Styles.BreadcrumbContainer>
      {props.menus.map((menu, index) => (
        <>
          <Link key={menu.id} href={menu.link}>
            {menu.title}
          </Link>

          {props.menus.length > index + 1 ? <span>&gt;</span> : ''}
        </>
      ))}
    </Styles.BreadcrumbContainer>
  )
}
