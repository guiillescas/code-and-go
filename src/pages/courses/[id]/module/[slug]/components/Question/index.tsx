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
            name="option"
            id={alternative.value}
            value={alternative.value}
            className="radio"
          />
          <label htmlFor={alternative.value}>{alternative.name}</label>
        </div>
      ))}
    </Styles.QuestionContainer>
  )
}
