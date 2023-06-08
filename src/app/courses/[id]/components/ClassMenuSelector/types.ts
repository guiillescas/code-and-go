/* eslint-disable no-unused-vars */
enum ClassTypeEnum {
  VIDEO = 'VIDEO',
  EXERCISE = 'EXERCISE',
}

interface ClassProps {
  title: string
  type: ClassTypeEnum
}

export interface ClassMenuSelectorProps {
  classes: ClassProps[]
}
