'use client'

import { ReactElement, useEffect } from 'react'

import ClassMenuSelector from './components/ClassMenuSelector'

import { api } from 'services/api'

import * as Styles from './styles'

import { CourseProps } from './types'

export default function Course(props: CourseProps): ReactElement {
  useEffect(() => {
    api.get(`/course${props.id}`)
  }, [props.id])

  return (
    <Styles.CourseContainer>
      <section>
        <h1>Curso de JavaScript</h1>

        <div className="content">
          <ClassMenuSelector />
        </div>
      </section>
    </Styles.CourseContainer>
  )
}
