import { SectionProps } from 'hooks/useCourse/types'

export interface InlineCardProps {
  name: string
  description: string
  handleOnClickCard: () => void
  disabled: boolean
}
