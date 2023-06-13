import { ReactNode } from "react"

export interface BaseModalProps {
  isOpen: boolean
  onRequestClose: () => void
  title?: string
  children: ReactNode
  maxWidth?: number | string
  maxHeight?: number | string
}

export interface ContainerProps {
  maxWidth?: number | string
  maxHeight?: number | string
}
