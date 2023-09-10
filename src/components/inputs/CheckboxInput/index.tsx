import { ForwardedRef, forwardRef, ReactElement } from 'react'

import * as Styles from './styles'

import { CheckboxInputProps } from './types'

function CheckboxInput(
  {
    label,
    boldLabel,
    name,
    isDisabled,
    error,
    customLabel,
    ...rest
  }: CheckboxInputProps,
  inputRef: ForwardedRef<HTMLInputElement>,
): ReactElement {
  return (
    <Styles.Container isDisabled={isDisabled} error={!!error}>
      <label htmlFor={customLabel ? undefined : name}>
        {customLabel || label} <strong>{boldLabel}</strong>
        <input
          name={name}
          type="checkbox"
          disabled={isDisabled}
          {...rest}
          ref={inputRef}
        />
        <span className="checkmark" />
      </label>

      <p>{error}</p>
    </Styles.Container>
  )
}

export default forwardRef<HTMLInputElement, CheckboxInputProps>(CheckboxInput)
