import { ButtonHTMLAttributes } from 'react'

export enum ButtonVariantsEnum {
  DEFAULT = 'DEFAULT',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: ButtonVariantsEnum
}

export interface ButtonContainerProps {
  isLoading?: boolean
  variant?: ButtonVariantsEnum
}
