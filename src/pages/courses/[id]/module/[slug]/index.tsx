import { ReactElement, useEffect, useState } from 'react'

import Accordion from '@/components/Accordion'
import Breadcrumb from '@/components/Breadcrumb'

import Question from './components/Question'

import { languageOptions } from '@/constants/languageOptions'
import axios from 'axios'
import { defineTheme } from 'lib/defineTheme'
import useKeyPress from '@/hooks/useKeyPress'
import CodeEditorWindow from 'components/CodeEditor'
import * as Styles from './styles'
import Button from '@/components/Button'
import { ButtonVariantsEnum } from '@/components/Button/types'
import { api } from '@/services/api'
import { toast } from 'react-toastify'
import { QuestionProps } from './types'
import ExerciseFeedbackModal from '@/components/ExerciseFeedbackModal'

const questions = [
  {
    title: 'Para que serve o .map()?',
    alternatives: [
      {
        name: 'Serve para passar por cada item de um array, e retorná-lo',
        value: '1',
      },
      {
        name: 'Serve para passar por cada item de um array',
        value: '2',
      },
      {
        name: 'Serve para passar por cada item asdugsa dasoiudgasoidug',
        value: '3',
      },
    ]
  },
  {
    title: 'Para que serve o .forEch()?',
    alternatives: [
      {
        name: 'Serve para passar porm array, e retorná-lo',
        value: '1',
      },
      {
        name: 'Serve para pasitem de um array',
        value: '2',
      },
      {
        name: 'Serve para passar por cada item asasoidug',
        value: '3',
      },
    ]
  },
]

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
  const [isExerciseFeedbackModalOpen, setIsExerciseFeedbackModalOpen] = useState(false)

  const [question, setQuestion] = useState<QuestionProps[]>([])

  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [theme, setTheme] = useState("GitHub");
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  // TODO - Adicionar tipagem correta
  const onSelectChange = (sl: any) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  // TODO - Adicionar tipagem correta
  const onChange = (action: any, data: any) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true)

    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          // showErrorToast(
          //   `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!`,
          //   10000
          // );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  // TODO - Adicionar tipagem correta
  async function checkStatus(token: any) {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        // showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      // showErrorToast();
    }
  };

  // TODO - Adicionar tipagem correta
  function handleThemeChange(th: any) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  function handleSendExercise() {
    setIsLoading(true)

    setTimeout(() => {
      toast.success('Exercício enviado com sucesso!')

      setIsLoading(false)
    }, 600);

    // api.post(`/exercise/exerciseId/resolve/testId`)
    //   .then(response => {
    //     toast.success('Exercício enviado com sucesso!')
    //     setIsExerciseFeedbackModalOpen(true)
    //   })
    //   .catch(error => {
    //     toast.error('Erro ao enviar exercício')
    //   })
    //   .finally(() => {
    //     setIsLoading(false)
    //   })
  }

  useEffect(() => {
    defineTheme("GitHub").then((_) =>
      setTheme("GitHub")
      // setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );

    api.get('/course/')
  }, []);

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  useEffect(() => {
    api
      .get(`/course/337c376e-ce44-4899-9c14-044052540082/module/469a43d8-cb47-4d5e-9521-5f215ad86053/start`)
      .then(response => {
        console.log(response.data)

        setQuestion(response.data)
      })
  }, [])

  return (
    <Styles.ModuleContainer>
      <div className="content">
        <div className="breadcrumb">
          <Breadcrumb menus={menus} />
        </div>

        <div className="questions">
          {questions.map((question, index) => {
            const questionNumber = ("0" + `${index + 1}`).slice(-2)

            return (
              <Accordion title={`Questão ${questionNumber}`} key={question.title} isOpen={index === 0}>
                <Question
                  title={question.title}
                  alternatives={question.alternatives}
                />
              </Accordion>
            )
          })}

          <Accordion title="Exercício" isOpen={false}>
            <div className="ecercise-wrapper">
              <p>Excreva um código que dê um log do resulktado da soa de 2 + 2</p>

              <CodeEditorWindow
                code={code}
                onChange={onChange}
                language={language?.value}
                theme={theme}
              />
            </div>
          </Accordion>

          <div className="footer">
            <Button variant={ButtonVariantsEnum.PRIMARY} onClick={handleSendExercise} isLoading={isLoading}>Enviar</Button>
          </div>
        </div>
      </div>

      <ExerciseFeedbackModal isOpen={isExerciseFeedbackModalOpen} onRequestClose={() => setIsExerciseFeedbackModalOpen(false)} isSuccess={true} />
    </Styles.ModuleContainer>
  )
}
