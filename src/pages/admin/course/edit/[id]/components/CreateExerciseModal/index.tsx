import { ReactElement, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import BaseModal from 'components/BaseModal'
import Button from 'components/Button'
import Input from 'components/inputs/input'
import Select from 'components/inputs/Select'

import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'
import { LanguageProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import * as Styles from './styles'

import { CreateExerciseModalProps } from './types'

const createCreateCategorySchema = Yup.object().shape({
  name: Yup.string().required(validationMessages.requiredField),
  description: Yup.string().required(validationMessages.requiredField),
  languageValue: Yup.number().required(validationMessages.requiredField),
})

interface CreateCategoryProps {
  name: string
  description: string
  languageValue: number
}

export default function CreateExerciseModal(
  props: CreateExerciseModalProps,
): ReactElement {
  const { token } = useAuth()

  const [languages, setLanguages] = useState<LanguageProps[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryProps>({
    resolver: yupResolver(createCreateCategorySchema),
  })

  function handleCreateCategory(data: CreateCategoryProps) {
    console.log(data)
    api(token)
      .post('/category', data)
      .then(() => {
        toast.success('Categoria criada com sucesso')

        props.onRequestClose()
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde')
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
    <BaseModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      title="Criar categoria"
      maxWidth={500}
    >
      <Styles.CreateExerciseModalContainer>
        <form onSubmit={handleSubmit(handleCreateCategory)}>
          <Input
            register={register}
            name="name"
            label="Nome"
            error={errors.name && errors.name.message}
          />

          <Input
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
                id: `${language.value}`,
                name: language.name,
                value: language.value,
              }
            })}
            error={errors.languageValue && errors.languageValue.message}
          />

          <Button type="submit">Criar</Button>
        </form>
      </Styles.CreateExerciseModalContainer>
    </BaseModal>
  )
}
