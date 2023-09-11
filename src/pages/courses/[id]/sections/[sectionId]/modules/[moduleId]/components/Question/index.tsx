import { ReactElement } from 'react'

import * as Styles from './styles'

import { QuestionProps } from './types'

export default function Question(props: QuestionProps): ReactElement {
  function haldneSelectAlternative(alternativeId: string) {
    props.setQuestions((prevState) =>
      prevState.map((question) => {
        return {
          ...question,
          alternatives: question.alternatives.map((alternative) => {
            if (alternative.id === alternativeId) {
              return {
                ...alternative,
                selected: true,
              }
            } else {
              return {
                ...alternative,
                selected: false,
              }
            }
          }),
        }
      }),
    )
  }

  return (
    <Styles.QuestionContainer>
      <p>{props.title}</p>

      {props.alternatives &&
        props.alternatives.map((alternative) => (
          <div
            className="option"
            key={alternative.id}
            onClick={() => haldneSelectAlternative(alternative.id)}
          >
            <input
              type="radio"
              name={props.title}
              id={alternative.description}
              value={alternative.id}
              className="radio"
            />
            <label htmlFor={alternative.description}>
              {alternative.description}
            </label>
          </div>
        ))}
    </Styles.QuestionContainer>
  )
}
