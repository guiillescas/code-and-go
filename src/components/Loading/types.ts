import { HTMLAttributes } from 'react'

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  width?: number
  height?: number
  color?: string
}
