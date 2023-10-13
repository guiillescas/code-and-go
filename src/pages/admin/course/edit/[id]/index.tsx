import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { FiEdit2 } from 'react-icons/fi'

import CreateExerciseModal from './components/CreateExerciseModal'
import CreateQuestionModal from './components/CreateQuestionModal'
import CreateSectionModal from './components/CreateSectionModal'
import EditSectionModal from './components/EditSectionModal'
import Button from 'components/Button'

import { useAuth } from 'hooks/useAuth'
import { CourseProps, SectionProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import AdminLayout from 'layouts/AdminLayout'

import * as Styles from './styles'

export default function AdminCourse(): ReactElement {
  const router = useRouter()

  const courseId = router.query.id as string

  const { token } = useAuth()

  const [isEditSectionModalOpen, setIsEditSectionModalOpen] = useState(false)
  const [isCreateSectionModalOpen, setIsCreateSectionModalOpen] =
    useState(false)
  const [isCreateExerciseModalOpen, setIsCreateExerciseModalOpen] =
    useState(false)
  const [isCreateQuestionModalOpen, setIsCreateQuestionModalOpen] =
    useState(false)

  const [selectedSection, setSelectedSection] = useState<SectionProps>()

  const [course, setCourse] = useState<CourseProps>()

  function handleCreateSection() {
    setIsCreateSectionModalOpen(true)
  }

  function handleEditSection(section: SectionProps) {
    setIsEditSectionModalOpen(true)
    setSelectedSection(section)
  }

  useEffect(() => {
    api(token)
      .get('/course')
      .then((response) => {
        const currentCourse: CourseProps = response.data.find(
          (course: CourseProps) => course.id === courseId,
        )

        setCourse(currentCourse)
      })
  }, [courseId, token])

  return (
    <AdminLayout>
      <Styles.AdminCourseContainer>
        <div className="header">
          <h1>Editar curso</h1>

          <div>
            <Button onClick={() => setIsCreateQuestionModalOpen(true)}>
              Criar questão
            </Button>
            <Button onClick={() => setIsCreateExerciseModalOpen(true)}>
              Criar exercício
            </Button>
          </div>
        </div>
        <section id="course">
          <p>
            <strong>Nome: </strong>
            {course?.name}
          </p>
          <p>
            <strong>Descrição: </strong>
            {course?.description}
          </p>
          <p>
            <strong>Linguagem: </strong>
            {course?.language.name}
          </p>
        </section>
        <div className="divider" />
        <section id="sections">
          <div className="header">
            <h2>Seções</h2>

            <Button onClick={handleCreateSection}>Criar seção</Button>
          </div>

          <table className="courses">
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>

            {course?.sections.map((section, index) => (
              <tr key={section.id} className="section">
                <td>{index + 1}</td>
                <td>{section.name}</td>
                <td>{section.description}</td>
                <td className="actions">
                  <button
                    type="button"
                    onClick={() => handleEditSection(section)}
                    title="Editar"
                  >
                    <FiEdit2 />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </section>

        <CreateSectionModal
          courseId={courseId}
          isOpen={isCreateSectionModalOpen}
          onRequestClose={() => setIsCreateSectionModalOpen(false)}
        />
        <EditSectionModal
          isOpen={isEditSectionModalOpen}
          sectionId={selectedSection?.id as string}
          onRequestClose={() => setIsEditSectionModalOpen(false)}
        />
        {course && (
          <CreateQuestionModal
            course={course}
            isOpen={isCreateQuestionModalOpen}
            onRequestClose={() => setIsCreateQuestionModalOpen(false)}
          />
        )}
        <CreateExerciseModal
          courseId={courseId}
          isOpen={isCreateExerciseModalOpen}
          onRequestClose={() => setIsCreateExerciseModalOpen(false)}
        />
      </Styles.AdminCourseContainer>
    </AdminLayout>
  )
}
