import { ReactElement } from 'react'

import * as Styles from './styles'
import { primary } from 'styles/fonts'

import { TextareaProps } from './types'

function Textarea<T>(props: TextareaProps<T>): ReactElement {
  return (
    <Styles.Container error={!!props.error} className={primary.className}>
      {props.label && (
        <label htmlFor={props.name}>
          {props.label} <strong>{props.boldLabel}</strong>
        </label>
      )}

      <textarea {...props.register(props.name)} {...props} />
      <p>{props.error}</p>
    </Styles.Container>
  )
}

export default Textarea
