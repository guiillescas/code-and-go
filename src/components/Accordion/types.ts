import { ReactNode } from 'react'

/* eslint-disable no-unused-vars */
enum ClassTypeEnum {
  VIDEO = 'VIDEO',
  EXERCISE = 'EXERCISE',
}

interface ClassProps {
  title: string
  type: ClassTypeEnum
}

export interface ClassMenuSelectorProps {
  classes: ClassProps[]
}

export interface AccordionProps {
  title: string
  isOpen: boolean
  children: ReactNode
  onAccordionOpen?: () => void
}

export interface AccordionContainerProps {
  isOpen: boolean
}
