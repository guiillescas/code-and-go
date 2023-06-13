import { ReactElement } from 'react'

import * as Styles from './styles'

import { QuestionProps } from './types'

export default function Question(props: QuestionProps): ReactElement {
  return (
    <Styles.QuestionContainer>
      <p>{props.title}</p>

      {props.alternatives.map((alternative) => (
        <div className="option" key={alternative.value}>
          <input
            type="radio"
            name={props.title}
            id={alternative.name}
            value={alternative.value}
            className="radio"
          />
          <label htmlFor={alternative.name}>{alternative.name}</label>
        </div>
      ))}
    </Styles.QuestionContainer>
  )
}
