import { ReactElement, useEffect, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'
import useKeyPress from 'utils/useKeyPress'

import Question from './components/Question'
import Accordion from 'components/Accordion'
import Breadcrumb from 'components/Breadcrumb'
import Button from 'components/Button'
import { ButtonVariantsEnum } from 'components/Button/types'
import CodeEditorWindow from 'components/CodeEditor'
import ExerciseFeedbackModal from 'components/ExerciseFeedbackModal'

import { languageOptions } from 'constants/languageOptions'

import { api } from 'services/api'

import { defineTheme } from 'lib/defineTheme'

import * as Styles from './styles'

import { QuestionProps } from './types'

// const questions = [
//   {
//     title: 'Para que serve o .map()?',
//     alternatives: [
//       {
//         name: 'Serve para passar por cada item de um array, e retorná-lo',
//         value: '1',
//       },
//       {
//         name: 'Serve para passar por cada item de um array',
//         value: '2',
//       },
//       {
//         name: 'Serve para passar por cada item asdugsa dasoiudgasoidug',
//         value: '3',
//       },
//     ]
//   },
//   {
//     title: 'Para que serve o .forEch()?',
//     alternatives: [
//       {
//         name: 'Serve para passar porm array, e retorná-lo',
//         value: '1',
//       },
//       {
//         name: 'Serve para pasitem de um array',
//         value: '2',
//       },
//       {
//         name: 'Serve para passar por cada item asasoidug',
//         value: '3',
//       },
//     ]
//   },
// ]

const menus = [
  {
    id: 1,
    title: 'Curso de JavaScript',
    link: '/courses/javascript',
  },
  {
    id: 2,
    title: 'Módulo 1',
    link: '/courses/javascript/module/1',
  },
]

const javascriptDefault = `// Escreva o código aqui
`

export default function Module(): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [isExerciseFeedbackModalOpen, setIsExerciseFeedbackModalOpen] =
    useState(false)

  const [questions, setQuestions] = useState<QuestionProps[]>([
    {
      id: '5bad82d9-8851-4e92-9ee5-57bd403b09df',
      title: 'Variáveis Javascript',
      description: 'Qual é a **Keyword** para declarar variáveis em javascript',
      alternatives: [
        {
          id: '2f3b6478-717f-4f47-a0a8-841812653db7',
          description: 'var myVariable = "I\'m an variable"',
        },
        {
          id: '4f345565-3e01-4e39-a587-27f35077ac8b',
          description: 'string myVariable = "I\'m an variable"',
        },
        {
          id: '9e8f28c5-7eee-45f3-b436-3205c8545f51',
          description: 'var myVariable: string = "I\'m an variable"',
        },
        {
          id: 'a89c0a66-c37f-40b4-ab07-9cd05fe71d9f',
          description: 'myVariable = "I\'m an variable"',
        },
      ],
    },
  ])

  const [code, setCode] = useState(javascriptDefault)
  const [customInput, setCustomInput] = useState('')
  const [outputDetails, setOutputDetails] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [theme, setTheme] = useState('GitHub')
  const [language, setLanguage] = useState(languageOptions[0])

  const enterPress = useKeyPress('Enter')
  const ctrlPress = useKeyPress('Control')

  // TODO - Adicionar tipagem correta
  const onSelectChange = (sl: any) => {
    console.log('selected Option...', sl)
    setLanguage(sl)
  }

  // TODO - Adicionar tipagem correta
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

  // TODO - Adicionar tipagem correta
  function handleThemeChange(th: any) {
    const theme = th
    console.log('theme...', theme)

    if (['light', 'vs-dark'].includes(theme.value)) {
      setTheme(theme)
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme))
    }
  }

  const [alternativeId, setAlternativeId] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  function handleSendExercise() {
    setIsLoading(true)

    setTimeout(() => {
      if (alternativeId === '2f3b6478-717f-4f47-a0a8-841812653db7') {
        setIsExerciseFeedbackModalOpen(true)
        setIsSuccess(true)
      } else {
        setIsExerciseFeedbackModalOpen(true)
        setIsSuccess(false)
      }

      setIsLoading(false)
    }, 600)

    // api.post(`/question/5bad82d9-8851-4e92-9ee5-57bd403b09df/resolve/${alternativeId}`)
    //   .then(response => {
    //     // toast.success('Exercício enviado com sucesso!')
    //     // setIsExerciseFeedbackModalOpen(true)
    //     console.log(response.data)
    //   })
    //   .catch(error => {
    //     toast.error('Erro ao enviar exercício')
    //   })
    //   .finally(() => {
    //     setIsLoading(false)
    //   })
  }

  useEffect(() => {
    defineTheme('GitHub').then(
      (_) => setTheme('GitHub'),
      // setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    )

    // api.get('/course/')
  }, [])

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log('enterPress', enterPress)
      console.log('ctrlPress', ctrlPress)
      handleCompile()
    }
  }, [ctrlPress, enterPress])

  // useEffect(() => {
  //   // course/{courseId}/module/{moduleId}/start
  //   api
  //     .get(`course/e4ae0e6b-add5-4a3d-990d-ed69d2d8a1d6/module/89f6fe07-aad0-4413-bfae-221959a9ac49/start`)
  //     .then(response => {
  //       console.log(response.data)

  //       setQuestions(response.data)
  //     })
  // }, [])

  return (
    <Styles.ModuleContainer>
      <div className="content">
        <div className="breadcrumb">
          <Breadcrumb menus={menus} />
        </div>

        <div className="questions">
          {questions.map((question, index) => {
            const questionNumber = ('0' + `${index + 1}`).slice(-2)

            return (
              <Accordion
                title={`Questão ${questionNumber}`}
                key={question.title}
                isOpen={index === 0}
              >
                <Question
                  title={question.title}
                  alternatives={question.alternatives}
                  setAlternativeId={setAlternativeId}
                />
              </Accordion>
            )
          })}

          <Accordion title="Exercício" isOpen={false}>
            <div className="ecercise-wrapper">
              <p>
                Excreva um código que dê um log do resulktado da soa de 2 + 2
              </p>

              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme}
              />
            </div>
          </Accordion>

          <div className="footer">
            <Button
              variant={ButtonVariantsEnum.PRIMARY}
              onClick={handleSendExercise}
              isLoading={isLoading}
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>

      <ExerciseFeedbackModal
        isOpen={isExerciseFeedbackModalOpen}
        onRequestClose={() => setIsExerciseFeedbackModalOpen(false)}
        isSuccess={isSuccess}
      />
    </Styles.ModuleContainer>
  )
}
