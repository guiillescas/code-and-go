import { SelectHTMLAttributes } from 'react'

interface IOptionsProps {
  id: string
  name: string
  value: string | number
  selected?: boolean
  disabled?: boolean
}

export interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  name: string
  error?: string
  options: IOptionsProps[]
  emptyValue?: boolean
  emptyLabel?: string
}
