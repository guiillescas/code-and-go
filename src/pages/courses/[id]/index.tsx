import { ReactElement, useEffect } from 'react'

import Breadcrumb from '@/components/Breadcrumb'
import ModuleCard from '@/components/ModuleCard'

import { api } from 'services/api'

import * as Styles from './styles'

import { CourseProps } from './types'

const menus = [
  {
    id: 1,
    title: 'Teste 1',
    link: '/courses/teste',
  },
  {
    id: 2,
    title: 'Teste 1',
    link: '/teste',
  },
]

const modules = [
  {
    id: 1,
    title: 'Modulo 1',
    imageUrl: '/courses/teste',
  },
  {
    id: 2,
    title: 'Modulo 1',
    imageUrl: '/teste',
  },
]

export default function Course(props: CourseProps): ReactElement {
  useEffect(() => {
    api.get(`/course${props.id}`)
  }, [props.id])

  return (
    <Styles.CourseContainer>
      <section>
        <Breadcrumb menus={menus} />

        <h1>Curso de JavaScript</h1>

        <div className="content">
          <h2>Módulos</h2>

          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              id={module.id}
              title={module.title}
              imageUrl={module.imageUrl}
              description="description"
            />
          ))}
        </div>
      </section>
    </Styles.CourseContainer>
  )
}
