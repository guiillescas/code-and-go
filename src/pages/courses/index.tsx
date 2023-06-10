import { ReactElement } from 'react'

import CourseCard from '@/components/CourseCard'

import * as Styles from './styles'

const courses = [
  {
    id: 'abc123',
    title: 'TypeScript Básico',
    description: 'Curso básico para aprender conceitos do typescript',
    imageUrl: '/me.jpeg',
  },
  {
    id: 'abc1234',
    title: 'TypeScript intermediário',
    description: 'Curso intermediário para aprender conceitos do typescript',
    imageUrl: '/me.jpeg',
  },
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
