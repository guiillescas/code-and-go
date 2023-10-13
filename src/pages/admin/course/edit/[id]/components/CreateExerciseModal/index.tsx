import { ReactElement, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { FiTrash } from 'react-icons/fi'
import { toast } from 'react-toastify'
import useKeyPress from 'utils/useKeyPress'
import * as Yup from 'yup'

import BaseModal from 'components/BaseModal'
import Button from 'components/Button'
import { ButtonVariantsEnum } from 'components/Button/types'
import CodeEditorWindow from 'components/CodeEditor'
import Input from 'components/inputs/input'
import Select from 'components/inputs/Select'

import { languageOptions } from 'constants/languageOptions'
import { validationMessages } from 'constants/validationMessages'

import { useAuth } from 'hooks/useAuth'

import { api } from 'services/api'

import { defineTheme } from 'lib/defineTheme'

import * as Styles from './styles'

import { CreateExerciseModalProps } from './types'

const createExerciseSchema = Yup.object().shape({
  title: Yup.string().required(validationMessages.requiredField),
  description: Yup.string().required(validationMessages.requiredField),
  categoryId: Yup.string().required(validationMessages.requiredField),
  difficultyValue: Yup.number().required(validationMessages.requiredField),
})

const createTestCaseSchema = Yup.object().shape({
  title: Yup.string().required(validationMessages.requiredField),
  result: Yup.string().required(validationMessages.requiredField),
})

interface TestCaseProps {
  title: string
  result: string
}

interface CreateExerciseProps {
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

export default function CreateExerciseModal(
  props: CreateExerciseModalProps,
): ReactElement {
  const { token } = useAuth()

  const [saveChangesWarning, setSaveChangesWarning] = useState(false)

  const [testCases, setTestCases] = useState<TestCaseProps[]>([])
  const [categories, setCategories] = useState<CategoryProps[]>([])

  const [code, setCode] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateExerciseProps>({
    resolver: yupResolver(createExerciseSchema),
  })

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
  } = useForm<TestCaseProps>({
    resolver: yupResolver(createTestCaseSchema),
  })

  function handleCreateTestCase(data: TestCaseProps) {
    if (testCases.find((testCase) => testCase.result === data.result)) {
      toast.warning('Você não pode cadastrar dois test cases iguais')

      return
    }

    setTestCases((prevState) => [...prevState, data])
    reset2()
  }

  function handleCreateExercise(data: CreateExerciseProps) {
    if (testCases.length < 1) {
      toast.warning('Cadastre pelo menos um test case')

      return
    }

    console.log(code)

    const formattedData = {
      courseId: props.course.id,
      title: data.title,
      description: data.description,
      categoryId: data.categoryId,
      difficultyValue: data.difficultyValue,
      typeValue: code.length > 1 ? 1 : 2,
      testCases,
      baseCode: code || '',
    }

    api(token)
      .post('/exercise', formattedData)
      .then(() => {
        toast.success('Categoria criada com sucesso')

        props.onRequestClose()

        reset()
        setTestCases([])
      })
      .catch(() => {
        toast.error('Erro inesperado. Tente novamente mais tarde')
      })
  }

  function handleExcludeTestCase(testCase: TestCaseProps) {
    setTestCases((prevState) =>
      prevState.filter(
        (testCaseFromState) => testCaseFromState.result !== testCase.result,
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
    setTestCases([])

    props.onRequestClose()
  }

  useEffect(() => {
    api(token)
      .get(`/category?language=${props.course.language?.value}`)
      .then((response) => {
        setCategories(response.data)
      })
  }, [props.course, token])

  /// ////////////// CODE EDITOR /////////////////////

  const [customInput, setCustomInput] = useState('')
  const [outputDetails, setOutputDetails] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [theme, setTheme] = useState('GitHub')
  const [language, setLanguage] = useState(languageOptions[0])

  const [isSuccess, setIsSuccess] = useState(false)

  const enterPress = useKeyPress('Enter')
  const ctrlPress = useKeyPress('Control')

  const onChange = (action: any, data: any) => {
    switch (action) {
      case 'code': {
        setCode(data)
        break
      }
      default: {
        console.warn('case not handled!', action, data)
      }
    }
  }

  const handleCompile = () => {
    setProcessing(true)

    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    }
    const options = {
      method: 'POST',
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    }

    axios
      .request(options)
      .then(function (response) {
        console.log('res.data', response.data)
        const token = response.data.token
        checkStatus(token)
      })
      .catch((err) => {
        const error = err.response ? err.response.data : err
        // get error status
        const status = err.response.status
        console.log('status', status)
        if (status === 429) {
          console.log('too many requests', status)

          // showErrorToast(
          //   `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
          //   10000
          // );
        }
        setProcessing(false)
        console.log('catch block...', error)
      })
  }

  // TODO - Adicionar tipagem correta
  async function checkStatus(token: any) {
    const options = {
      method: 'GET',
      url: process.env.REACT_APP_RAPID_API_URL + '/' + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      },
    }
    try {
      const response = await axios.request(options)
      const statusId = response.data.status?.id

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token)
        }, 2000)
        return
      } else {
        setProcessing(false)
        setOutputDetails(response.data)
        // showSuccessToast(`Compiled Successfully!`);
        console.log('response.data', response.data)
        return
      }
    } catch (err) {
      console.log('err', err)
      setProcessing(false)
      // showErrorToast();
    }
  }

  useEffect(() => {
    defineTheme('GitHub').then((_) => setTheme('GitHub'))
  }, [])

  console.log(testCases)

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log('enterPress', enterPress)
      console.log('ctrlPress', ctrlPress)
      handleCompile()
    }
  }, [ctrlPress, enterPress])

  return (
    <BaseModal
      isOpen={props.isOpen}
      onRequestClose={onRequestClose}
      title="Criar exercício"
      maxWidth={750}
    >
      <Styles.CreateExerciseModalContainer>
        <form id="hook-form" onSubmit={handleSubmit(handleCreateExercise)}>
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

          <p>Código base (opcional)</p>
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme}
          />
        </form>

        <div className="test-cases">
          <h2>Test cases</h2>

          <table>
            <tr>
              <th></th>
              <th>Título</th>
              <th>Reultado</th>
              <th>Ação</th>
            </tr>

            {testCases.map((testCase, index) => (
              <tr key={testCase.result} className="testCase">
                <td>{index + 1}</td>
                <td>{testCase.title}</td>
                <td>{testCase.result}</td>
                <td className="actions">
                  <button
                    type="button"
                    onClick={() => handleExcludeTestCase(testCase)}
                    title="Editar"
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </table>

          <form onSubmit={handleSubmit2(handleCreateTestCase)}>
            <Input
              register={register2}
              name="title"
              label="Título"
              error={errors2.title && errors2.title.message}
            />
            <Input
              register={register2}
              name="result"
              label="Resultado esperado"
              error={errors2.result && errors2.result.message}
            />

            <Button type="submit" variant={ButtonVariantsEnum.SECONDARY}>
              Criar test case
            </Button>
          </form>
        </div>

        <Button onClick={() => handleSubmit(handleCreateExercise)()}>
          Criar exercício
        </Button>
      </Styles.CreateExerciseModalContainer>
    </BaseModal>
  )
}
