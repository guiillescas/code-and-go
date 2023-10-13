import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

import { MdOutlineHideImage } from 'react-icons/md'
import { toast } from 'react-toastify'

import Button from 'components/Button'

import { useAuth } from 'hooks/useAuth'
import { UserProps } from 'hooks/useAuth/types'
import { useCourse } from 'hooks/useCourse'

import { api } from 'services/api'

import * as Styles from './styles'

import { CourseCardProps } from './types'

export default function CourseCard(props: CourseCardProps): ReactElement {
  const router = useRouter()

  const { user, token, updateUser } = useAuth()
  const { setCourse } = useCourse()

  const [isLoading, setIsLoading] = useState(false)

  function handleClickCourseCard() {
    if (user.courseIds.includes(props.course.id)) {
      router.push(`/courses/${props.course.id}/sections`)

      return
    }

    setIsLoading(true)

    api(token)
      .post(`/user/${user.id}/register/${props.course.id}`)
      .then(() => {
        const updatedUser: UserProps = {
          ...user,
          courseIds: [...user.courseIds, props.course.id],
        }

        updateUser(updatedUser)
        setCourse(props.course)

        router.push(`/courses/${props.course.id}/sections`)
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde')
      })
      .finally(() => {
        setIsLoading(false)
      })
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

        <Button
          onClick={handleClickCourseCard}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {user.courseIds.includes(props.course.id)
            ? 'Acessar curso'
            : 'Increver-se no curso'}
        </Button>
      </div>
    </Styles.CourseCardContainer>
  )
}
