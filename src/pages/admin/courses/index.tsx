import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { FiEdit2, FiTrash } from 'react-icons/fi'

import CreateCategoryModal from './components/CreateCategoryModal'
import Button from 'components/Button'

import { useAuth } from 'hooks/useAuth'
import { CourseProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import AdminLayout from 'layouts/AdminLayout'

import * as Styles from './styles'

export default function AdminCourses(): ReactElement {
  const router = useRouter()

  const { token } = useAuth()

  const [courses, setCourses] = useState<CourseProps[]>([])

  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false)

  useEffect(() => {
    api(token)
      .get('/course')
      .then((response) => {
        setCourses(response.data)
      })
  }, [token])

  function handleEditCourse(course: CourseProps) {
    router.push(`/admin/course/edit/${course.id}`)
  }

  return (
    <AdminLayout>
      <Styles.AdminCoursesContainer>
        <div className="header">
          <h1>Cursos da plataforma</h1>

          <div>
            <Button onClick={() => setIsCreateCategoryModalOpen(true)}>
              Criar categoria
            </Button>
            <Button onClick={() => router.push('/admin/course/create')}>
              Criar curso
            </Button>
          </div>
        </div>

        <table className="courses">
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>

          {courses.map((course, index) => (
            <tr key={course.id} className="course">
              <td>{index + 1}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td className="actions">
                <button
                  type="button"
                  onClick={() => handleEditCourse(course)}
                  title="Editar"
                >
                  <FiEdit2 />
                </button>
              </td>
            </tr>
          ))}
        </table>

        <CreateCategoryModal
          isOpen={isCreateCategoryModalOpen}
          onRequestClose={() => setIsCreateCategoryModalOpen(false)}
        />
      </Styles.AdminCoursesContainer>
    </AdminLayout>
  )
}
