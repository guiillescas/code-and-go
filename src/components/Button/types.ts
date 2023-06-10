import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export interface ButtonContainerProps {
  isLoading?: boolean
}
