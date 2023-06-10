import { ReactElement, useEffect, useState } from 'react'

import Accordion from '@/components/Accordion'
import Breadcrumb from '@/components/Breadcrumb'

import Question from './components/Question'

import * as Styles from './styles'

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

const javascriptDefault = `// some comment`;

export default function Module(): ReactElement {
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
            {/* <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            /> */}
          </Accordion>
        </div>
      </div>
    </Styles.ModuleContainer>
  )
}
