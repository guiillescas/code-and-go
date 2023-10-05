import { TextareaHTMLAttributes } from 'react'

import { Path } from 'react-hook-form'

export interface TextareaProps<T>
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: any
  name: Path<T>
  label?: string
  boldLabel?: string
  error?: string
}

export interface ContainerProps {
  error: boolean
}
