interface MenuProps {
  id: number
  title: string
  link: string
}

export interface BreadcrumbProps {
  menus: MenuProps[]
}
