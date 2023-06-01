import Image from 'next/image'
import { ReactElement } from 'react'

import Button from 'components/Button'

import * as Styles from './styles'

import { CourseCardProps } from './types'

export default function CourseCard(props: CourseCardProps): ReactElement {
  return (
    <Styles.CourseCardContainer>
      <div className="image-wrapper">
        <Image
          src={props.imageUrl}
          alt={`Imagem do curso ${props.title}`}
          fill
        />
      </div>

      <div className="content">
        <h2>{props.title}</h2>
        <p>{props.description}</p>

        <Button>Acessar curso</Button>
      </div>
    </Styles.CourseCardContainer>
  )
}
