import { ForwardedRef, forwardRef, ReactElement } from 'react'

import InputMask, { ReactInputMask } from 'react-input-mask'

import * as Styles from './styles'

import { IInputProps } from './types'

function InputWithMask(
  { label, boldLabel, name, error, mask, ...rest }: IInputProps,
  inputRef: ForwardedRef<ReactInputMask>,
): ReactElement {
  return (
    <Styles.Container error={!!error}>
      {label && (
        <label htmlFor={name}>
          {label} <strong>{boldLabel}</strong>
        </label>
      )}

      <InputMask name={name} mask={mask} {...rest} ref={inputRef} />
      <p>{error}</p>
    </Styles.Container>
  )
}

export default forwardRef<ReactInputMask, IInputProps>(InputWithMask)
