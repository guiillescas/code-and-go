import { ReactElement, useEffect, useState } from 'react'

import ModuleCard from '@/components/ModuleCard'

import { api } from 'services/api'

import * as Styles from './styles'

import { CourseProps } from './types'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import module from 'next/dist/server/future/route-modules/app-route/module'

const modules = [
  {
    id: '469a43d8-cb47-4d5e-9521-5f215ad86053',
    title: 'Declaração de Variavéis',
    imageUrl: '/courses/teste',
  }
]

export default function Course(): ReactElement {
  return (
    <Styles.CourseContainer>
      <section>
        <h1>Curso de Javascript</h1>

        <div className="content">
          <h2>Módulos</h2>

          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              courseId={"337c376e-ce44-4899-9c14-044052540082"}
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
