import { Dispatch, SetStateAction } from 'react'

import { SectionProps } from '@/hooks/useCourse/types'

export interface CreateSectionModalProps {
  courseId: string
  isOpen: boolean
  onRequestClose: () => void
  setSections: Dispatch<SetStateAction<SectionProps[]>>
}
