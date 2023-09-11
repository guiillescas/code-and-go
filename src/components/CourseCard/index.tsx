import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

import { MdOutlineHideImage } from 'react-icons/md'

import Button from 'components/Button'

import { useCourse } from 'hooks/useCourse'

import * as Styles from './styles'

import { CourseCardProps } from './types'

export default function CourseCard(props: CourseCardProps): ReactElement {
  const router = useRouter()

  const { setCourse } = useCourse()

  function handleClickCourseCard() {
    setCourse(props.course)

    router.push(`/courses/${props.course.id}/sections`)
  }

  return (
    <Styles.CourseCardContainer>
      <div className="image-wrapper">
        {props.course.courseIcon ? (
          <Image
            src={props.course.courseIcon}
            alt={`Imagem do curso ${props.course.name}`}
            fill
          />
        ) : (
          <MdOutlineHideImage size={28} />
        )}
      </div>

      <div className="content">
        <h2>{props.course.name}</h2>
        <p>{props.course.description}</p>

        <Button onClick={handleClickCourseCard}>Acessar curso</Button>
      </div>
    </Styles.CourseCardContainer>
  )
}
