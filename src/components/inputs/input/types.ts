import { InputHTMLAttributes } from 'react'

import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

export interface InputProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>
  name: Path<T>
  label?: string
  boldLabel?: string
  error?: string
}

export interface ContainerProps {
  error: boolean
}
