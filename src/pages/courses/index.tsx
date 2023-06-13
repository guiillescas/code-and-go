import { ReactElement } from 'react'

import CourseCard from '@/components/CourseCard'

import * as Styles from './styles'

const courses = [
  {
    id: '337c376e-ce44-4899-9c14-044052540082',
    title: 'JavaScript',
    description: 'The Code&Go base Javascript Course',
    imageUrl: '/ts.png',
  }
]

export default function Courses(): ReactElement {
  return (
    <Styles.CoursesContainer>
      <h1>Meus cursos</h1>

      <Styles.CoursesWrapper>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            imageUrl={course.imageUrl}
          />
        ))}
      </Styles.CoursesWrapper>
    </Styles.CoursesContainer>
  )
}
