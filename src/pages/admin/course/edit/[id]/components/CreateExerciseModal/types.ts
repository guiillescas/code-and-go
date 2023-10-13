import { CourseProps } from 'hooks/useCourse/types'

export interface CreateExerciseModalProps {
  course: CourseProps
  isOpen: boolean
  onRequestClose: () => void
}
