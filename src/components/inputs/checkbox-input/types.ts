import { InputHTMLAttributes } from 'react'

export interface ICheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  customLabel?: JSX.Element
  boldLabel?: string
  name: string
  error?: string
  isDisabled?: boolean
}
