import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import Button from 'components/Button'
import Input from 'components/inputs/input'
import Select from 'components/inputs/Select'
import Textarea from 'components/inputs/Textarea'

import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'
import { LanguageProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import AdminLayout from 'layouts/AdminLayout'

import * as Styles from './styles'

import { CreateCourseFormProps } from './types'

const createCourseSchema = Yup.object().shape({
  name: Yup.string().required(validationMessages.requiredField),
  description: Yup.string().required(validationMessages.requiredField),
  languageValue: Yup.number().required(validationMessages.requiredField),
})

export default function AdminCreateCourse(): ReactElement {
  const router = useRouter()

  const { token } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourseFormProps>({
    resolver: yupResolver(createCourseSchema),
  })

  const [languages, setLanguages] = useState<LanguageProps[]>([])
  const [isLoading, setIsLoading] = useState(false)

  function createCourse(data: CreateCourseFormProps) {
    setIsLoading(true)

    api(token)
      .post('/course', data)
      .then((response) => {
        toast.success('Curso criado com sucesso')

        router.push(`/admin/course/edit/${response.data.id}`)
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    api(token)
      .get('/course/languages')
      .then((response) => {
        setLanguages(response.data)
      })
  }, [token])

  return (
    <AdminLayout>
      <Styles.AdminCreateCourseContainer>
        <h1>Criar um curso</h1>

        <form onSubmit={handleSubmit(createCourse)}>
          <Input
            register={register}
            name="name"
            label="Nome do curso"
            error={errors.name && errors.name.message}
          />

          <Textarea
            register={register}
            name="description"
            label="Descrição"
            error={errors.description && errors.description.message}
          />

          <Select
            {...register('languageValue')}
            label="Linguagem"
            options={languages.map((language) => {
              return {
                id: language.name,
                name: language.name,
                value: language.value,
              }
            })}
            error={errors.languageValue && errors.languageValue.message}
          />

          <Button type="submit" isLoading={isLoading}>
            Criar curso
          </Button>
        </form>
      </Styles.AdminCreateCourseContainer>
    </AdminLayout>
  )
}
