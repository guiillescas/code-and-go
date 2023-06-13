import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import Button from 'components/Button'

import * as Styles from './styles'

import { CourseCardProps } from './types'

export default function CourseCard(props: CourseCardProps): ReactElement {
  const router = useRouter()

  function handleClickCourseCard() {
    router.push(`/courses/${props.id}`)
  }

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

        <Button onClick={handleClickCourseCard}>Acessar curso</Button>
      </div>
    </Styles.CourseCardContainer>
  )
}
