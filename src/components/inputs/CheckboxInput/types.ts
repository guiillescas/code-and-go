import { InputHTMLAttributes, ReactNode } from 'react'

export interface CheckboxInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  customLabel?: ReactNode
  boldLabel?: string
  name: string
  error?: string
  isDisabled?: boolean
}
