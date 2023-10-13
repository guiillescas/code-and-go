import { CourseProps } from 'hooks/useCourse/types'

export interface CreateQuestionModalProps {
  course: CourseProps
  isOpen: boolean
  onRequestClose: () => void
}
