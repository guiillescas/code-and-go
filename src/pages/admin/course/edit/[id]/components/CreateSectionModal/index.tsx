import { ReactElement } from 'react'

import Button from '@/components/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
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
  const { token } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSectionProps>({
    resolver: yupResolver(createSectionSchema),
  })

  function handleCreateSection(data: CreateSectionProps) {
    api(token).post(``)
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

          <Button type="submit">Criar seção</Button>
        </form>
      </Styles.CreateSectionModalContainer>
    </BaseModal>
  )
}
