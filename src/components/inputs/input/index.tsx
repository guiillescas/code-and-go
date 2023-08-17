import { ReactElement } from 'react'

import * as Styles from './styles'

import { InputProps } from './types'

function Input<T>(props: InputProps<T>): ReactElement {
  return (
    <Styles.Container error={!!props.error}>
      {props.label && (
        <label htmlFor={props.name}>
          {props.label} <strong>{props.boldLabel}</strong>
        </label>
      )}

      <input {...props.register(props.name)} {...props} />
      <p>{props.error}</p>
    </Styles.Container>
  )
}

export default Input
