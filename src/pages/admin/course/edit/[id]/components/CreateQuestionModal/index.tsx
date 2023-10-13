import { ReactElement, useEffect, useState } from 'react'

import { ButtonVariantsEnum } from '@/components/Button/types'
import CheckboxInput from '@/components/inputs/CheckboxInput'
import { yupResolver } from '@hookform/resolvers/yup'
import courses from 'pages/courses'
import { useForm } from 'react-hook-form'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import BaseModal from 'components/BaseModal'
import Button from 'components/Button'
import Input from 'components/inputs/input'
import Select from 'components/inputs/Select'

import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import * as Styles from './styles'

import { CreateQuestionModalProps } from './types'

const createCategorySchema = Yup.object().shape({
  title: Yup.string().required(validationMessages.requiredField),
  description: Yup.string().required(validationMessages.requiredField),
  categoryId: Yup.string().required(validationMessages.requiredField),
  difficultyValue: Yup.number().required(validationMessages.requiredField),
})

const createAlternativeSchema = Yup.object().shape({
  description: Yup.string().required(validationMessages.requiredField),
  isCorrect: Yup.boolean().required(validationMessages.requiredField),
})

interface AlternativeProps {
  description: string
  isCorrect: boolean
}

interface CreateQuestionProps {
  title: string
  description: string
  categoryId: string
  difficultyValue: number
}

interface CategoryProps {
  id: string
  name: string
  description: string
  language: number
}

export default function CreateQuestionModal(
  props: CreateQuestionModalProps,
): ReactElement {
  const { token } = useAuth()

  const [saveChangesWarning, setSaveChangesWarning] = useState(false)

  const [alternatives, setAlternatives] = useState<AlternativeProps[]>([])
  const [categories, setCategories] = useState<CategoryProps[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuestionProps>({
    resolver: yupResolver(createCategorySchema),
  })

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm<AlternativeProps>({
    resolver: yupResolver(createAlternativeSchema),
  })

  function handleCreateAlternative(data: AlternativeProps) {
    if (
      alternatives.find(
        (alternative) => alternative.description === data.description,
      )
    ) {
      toast.warning('Você não pode cadastrar duas alternativas iguais')

      return
    }

    setAlternatives((prevState) => [...prevState, data])
    reset2()
  }

  function handleCreateQuestion(data: CreateQuestionProps) {
    if (alternatives.length < 2) {
      toast.warning('Cadastre pelo menos duas alternativas')

      return
    }

    const formattedData = {
      courseId: props.course.id,
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      difficultyValue: data.difficultyValue,
      alternatives,
    }

    api(token)
      .post('/question', formattedData)
      .then(() => {
        toast.success('Categoria criada com sucesso')

        props.onRequestClose()

        reset()
        reset2()
        setAlternatives([])
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde')
      })
  }

  function handleExcludeAlternative(description: string) {
    setAlternatives((prevState) =>
      prevState.filter(
        (alternative) => alternative.description !== description,
      ),
    )
  }

  function onRequestClose() {
    if (!saveChangesWarning) {
      toast.warning('Você não salvou as alterações.')

      setSaveChangesWarning(true)

      return
    }

    reset()
    reset2()
    setAlternatives([])

    props.onRequestClose()
  }

  useEffect(() => {
    api(token)
      .get(`/category?language=${props.course.language.value}`)
      .then((response) => {
        setCategories(response.data)
      })
  }, [props.course.language.value, token])

  return (
    <BaseModal
      isOpen={props.isOpen}
      onRequestClose={onRequestClose}
      title="Criar questão"
      maxWidth={750}
    >
      <Styles.CreateQuestionModalContainer>
        <form id="hook-form" onSubmit={handleSubmit(handleCreateQuestion)}>
          <Input
            register={register}
            name="title"
            label="Título"
            error={errors.title && errors.title.message}
          />

          <Input
            register={register}
            name="description"
            label="Descrição"
            error={errors.description && errors.description.message}
          />

          <Input
            register={register}
            name="difficultyValue"
            label="Dificuldade (De 1 a 5)"
            error={errors.difficultyValue && errors.difficultyValue.message}
          />

          <Select
            {...register('categoryId')}
            label="Categoria"
            options={categories.map((category) => {
              return {
                id: `${category.id}`,
                name: category.name,
                value: category.id,
              }
            })}
            error={errors.categoryId && errors.categoryId.message}
          />
        </form>

        <div className="alternatives">
          <p>Alternativas</p>

          <table className="courses">
            <tr>
              <th></th>
              <th>Descrição</th>
              <th>Correta</th>
              <th>Ação</th>
            </tr>

            {alternatives.map((alternative, index) => (
              <tr key={alternative.description} className="alternative">
                <td>{index + 1}</td>
                <td>{alternative.description}</td>
                <td>{alternative.isCorrect ? 'Sim' : 'Não'}</td>
                <td className="actions">
                  <button
                    type="button"
                    onClick={() =>
                      handleExcludeAlternative(alternative.description)
                    }
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </table>

          <form onSubmit={handleSubmit2(handleCreateAlternative)}>
            <Input
              register={register2}
              name="description"
              label="Descrição"
              error={errors2.description && errors2.description.message}
            />
            <CheckboxInput
              {...register2('isCorrect')}
              id="isCorrect"
              name="isCorrect"
              label="Afirmativa correta"
              error={errors2.isCorrect && errors2.isCorrect.message}
            />

            <Button type="submit" variant={ButtonVariantsEnum.SECONDARY}>
              Criar alternativa
            </Button>
          </form>
        </div>

        <Button onClick={() => handleSubmit(handleCreateQuestion)()}>
          Criar questão
        </Button>
      </Styles.CreateQuestionModalContainer>
    </BaseModal>
  )
}
