import { Fragment, ReactElement, useEffect, useState } from 'react'

import Button from '@/components/Button'
import CourseCard from '@/components/CourseCard'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Select from 'components/inputs/Select'

import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'
import { CourseProps, LanguageProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import AppLayout from 'layouts/AppLayout'

import * as Styles from './styles'

const firstLanguageSchema = Yup.object().shape({
  languageValue: Yup.number()
    .required(validationMessages.requiredField)
    .typeError('Campo obrigatório'),
})

interface FormProps {
  languageValue: number
}

export default function Welcome(): ReactElement {
  const { token } = useAuth()

  const [languages, setLanguages] = useState<LanguageProps[]>([])
  const [courses, setCourses] = useState<CourseProps[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(firstLanguageSchema),
  })

  function handleSelectLanguage(data: FormProps) {
    setCourses((prevState) => {
      return prevState.filter(
        (course) => course.language.value === data.languageValue,
      )
    })
    setSelectedLanguage(true)
  }

  useEffect(() => {
    api(token)
      .get('/course/languages')
      .then((response) => {
        setLanguages(response.data)
      })

    api(token)
      .get<CourseProps[]>('/course')
      .then((response) => {
        setCourses(response.data)
      })
  }, [token])

  useEffect(() => {
    handleSubmit(handleSelectLanguage)()
  }, [watch('languageValue')])

  return (
    <AppLayout>
      <Styles.WelcomeContainer>
        <h1>Seja bem vindo a plataforma!</h1>

        <form onSubmit={handleSubmit(handleSelectLanguage)}>
          <p>Primeiro, escolha uma linguagem para ver os cursos disponíveis:</p>

          <Select
            {...register('languageValue')}
            label="Linguagem"
            options={[
              {
                id: '123241124124124214124',
                name: 'Selecione um curso',
                value: '',
                disabled: true,
                selected: true,
              },
              ...languages.map((language) => {
                return {
                  id: `${language.value}`,
                  name: language.name,
                  value: language.value,
                }
              }),
            ]}
            error={errors.languageValue && errors.languageValue.message}
          />
        </form>

        <section id="courses">
          {selectedLanguage && (
            <Fragment>
              <h2>
                Cursos de acordo com o curso{' '}
                {courses.length > 0 && courses[0].language.name}
              </h2>
              <Styles.CoursesWrapper>
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))
                ) : (
                  <p>Ainda não temos curso para esta linguagem :(</p>
                )}
              </Styles.CoursesWrapper>
            </Fragment>
          )}
        </section>
      </Styles.WelcomeContainer>
    </AppLayout>
  )
}
