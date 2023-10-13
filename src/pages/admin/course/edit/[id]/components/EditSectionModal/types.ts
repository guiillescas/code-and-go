import { SectionProps } from 'hooks/useCourse/types'

export interface EditSectionModalProps {
  sectionId: string
  isOpen: boolean
  onRequestClose: () => void
}
