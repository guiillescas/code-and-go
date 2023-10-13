import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { FiEdit2 } from 'react-icons/fi'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import BaseModal from 'components/BaseModal'
import Button from 'components/Button'
import { ButtonVariantsEnum } from 'components/Button/types'
import Input from 'components/inputs/input'
import Select from 'components/inputs/Select'

import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'
import { CourseProps } from 'hooks/useCourse/types'

import { api } from 'services/api'

import * as Styles from './styles'

import { EditSectionModalProps } from './types'

const createModuleSchema = Yup.object().shape({
  name: Yup.string().required(validationMessages.requiredField),
  totalLessons: Yup.number().required(validationMessages.requiredField),
  categoryId: Yup.string().required(validationMessages.requiredField),
  difficulty: Yup.number().required(validationMessages.requiredField),
})

interface CreateModuleFormProps {
  name: string
  totalLessons: number
  categoryId: string
  difficulty: number
}

interface CategoriesProps {
  id: string
  name: string
  description: string
  language: number
}

export default function EditSectionModal(
  props: EditSectionModalProps,
): ReactElement {
  const router = useRouter()

  const { token } = useAuth()

  const courseId = router.query.id as string

  const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [course, setCourse] = useState<CourseProps>()

  const [categories, setCategories] = useState<CategoriesProps[]>([])

  const section = course?.sections.find(
    (section) => section.id === props.sectionId,
  )
  const modules = course?.sections.find(
    (section) => section.id === props.sectionId,
  )?.modules

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateModuleFormProps>({
    resolver: yupResolver(createModuleSchema),
  })

  function handleEditModule(moduleId: string) {
    router.push(
      `/admin/course/edit/${section?.id}/${
        router.query.id as string
      }/module/${moduleId}`,
    )
  }

  function onRequestClose() {
    setIsCreateModuleOpen(false)
    props.onRequestClose()
  }

  function handleCreateModule(data: CreateModuleFormProps) {
    setIsLoading(true)

    const formattedData = {
      ...data,
      sectionId: props.sectionId,
      ModuleTypeValue: 1,
    }

    api(token)
      .post(`/course/${router.query.id as string}/module`, formattedData)
      .then(() => {
        props.onRequestClose()
        toast.success('Módulo criado com sucesso')
        reset()
        setIsCreateModuleOpen(false)
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (course) {
      api(token)
        .get(`/category?language=${course.language.value}`)
        .then((response) => {
          setCategories(response.data)
        })
    }
  }, [course, course?.language.value, token])

  useEffect(() => {
    api(token)
      .get('/course')
      .then((response) => {
        const currentCourse: CourseProps = response.data.find(
          (course: CourseProps) => course.id === courseId,
        )

        setCourse(currentCourse)
      })
  }, [courseId, token, props.isOpen])

  return (
    <BaseModal
      isOpen={props.isOpen}
      onRequestClose={onRequestClose}
      title="Editar seção"
      maxWidth={700}
    >
      <Styles.EditSectionModalContainer>
        <p>
          <strong>Nome: </strong>
          {section?.name}
        </p>
        <p>
          <strong>Descrição: </strong>
          {section?.description}
        </p>

        <section id="modules">
          <h2>Módulos</h2>

          <table className="courses">
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>

            {section?.modules.map((module, index) => (
              <tr key={module.id} className="module">
                <td>{index + 1}</td>
                <td>{module.name}</td>
                <td className="actions">
                  <button
                    type="button"
                    onClick={() => handleEditModule(module.id)}
                  >
                    <FiEdit2 />
                  </button>
                </td>
              </tr>
            ))}
          </table>

          <Button onClick={() => setIsCreateModuleOpen(true)}>
            Criar módulo
          </Button>
        </section>

        {isCreateModuleOpen && (
          <section id="module">
            <h3>Criar módulo</h3>

            <form onSubmit={handleSubmit(handleCreateModule)}>
              <Input
                register={register}
                name="name"
                label="Nome"
                error={errors.name && errors.name.message}
              />
              <Input
                register={register}
                name="totalLessons"
                label="Total de lições"
                type="number"
                error={errors.totalLessons && errors.totalLessons.message}
              />
              <Select
                {...register('categoryId')}
                label="Tipo de módulo"
                options={categories.map((category) => {
                  return {
                    id: category.id,
                    name: category.name,
                    value: category.id,
                  }
                })}
                error={errors.categoryId && errors.categoryId.message}
              />
              <Input
                register={register}
                name="difficulty"
                label="Nível de dificuldade (1 a 5)"
                type="number"
                error={errors.difficulty && errors.difficulty.message}
              />

              <div className="buttons-wrapper">
                <Button
                  onClick={() => {
                    setIsCreateModuleOpen(false)
                    reset()
                  }}
                  variant={ButtonVariantsEnum.SECONDARY}
                >
                  Cancelar
                </Button>
                <Button type="submit" isLoading={isLoading}>
                  Criar
                </Button>
              </div>
            </form>
          </section>
        )}
      </Styles.EditSectionModalContainer>
    </BaseModal>
  )
}
