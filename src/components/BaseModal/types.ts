import { ReactNode } from 'react'

export interface BasicModalProps {
  isOpen: boolean
  onRequestClose: () => void
  title?: string
  maxWidth?: number | string
  maxHeight?: number | string
}

export interface BaseModalProps extends BasicModalProps {
  children: ReactNode
}

export interface ContainerProps {
  maxWidth?: number | string
  maxHeight?: number | string
}
