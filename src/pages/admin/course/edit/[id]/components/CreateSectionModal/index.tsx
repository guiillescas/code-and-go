import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

import Button from '@/components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import BaseModal from 'components/BaseModal'
import Input from 'components/inputs/input'
import Textarea from 'components/inputs/Textarea'

import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import * as Styles from './styles'

import { CreateSectionProps } from '../../types'
import { CreateSectionModalProps } from './types'

const createSectionSchema = Yup.object().shape({
  name: Yup.string().required(validationMessages.requiredField),
  description: Yup.string().required(validationMessages.requiredField),
})

export default function CreateSectionModal(
  props: CreateSectionModalProps,
): ReactElement {
  const router = useRouter()

  const { token } = useAuth()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSectionProps>({
    resolver: yupResolver(createSectionSchema),
  })

  function handleCreateSection(data: CreateSectionProps) {
    setIsLoading(true)

    api(token)
      .post(`/course/${router.query.id}/section`, data)
      .then((response) => {
        const totalOfSections = response.data.sections.length

        props.setSections((prevState) => {
          return [...prevState, response.data.sections[totalOfSections - 1]]
        })
        toast.success('Seção criada com sucesso')
      })
      .catch(() => {
        toast.error(
          'Erro inesperado ao criar seção. Tente novamente mais tarde',
        )
      })
      .finally(() => {
        setIsLoading(false)
        props.onRequestClose()
        reset()
      })
  }

  return (
    <BaseModal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      title="Criar seção"
      maxWidth={500}
    >
      <Styles.CreateSectionModalContainer>
        <form onSubmit={handleSubmit(handleCreateSection)}>
          <Input
            register={register}
            name="name"
            label="Nome"
            error={errors.name && errors.name.message}
          />

          <Textarea
            register={register}
            name="description"
            label="Descrição"
            error={errors.description && errors.description.message}
          />

          <Button type="submit" isLoading={isLoading}>
            Criar seção
          </Button>
        </form>
      </Styles.CreateSectionModalContainer>
    </BaseModal>
  )
}
