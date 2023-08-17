import { InputHTMLAttributes } from 'react'

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  boldLabel?: string
  name: string
  mask: string
  error?: string
}

export interface ContainerProps {
  error: boolean
}
