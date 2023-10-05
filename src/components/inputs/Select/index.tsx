import { ForwardedRef, forwardRef, ReactElement } from 'react'

import * as Styles from './styles'

import { ISelectProps } from './types'

function Select(
  { label, name, options, error, ...rest }: ISelectProps,
  selectRef: ForwardedRef<HTMLSelectElement>,
): ReactElement {
  return (
    <Styles.Container error={error}>
      <label htmlFor={name}>{label}</label>

      <select id={name} name={name} {...rest} ref={selectRef}>
        {rest.emptyValue && (
          <option key={-1} value="" disabled={rest.required}>
            {rest.emptyLabel || 'Selecione...'}
          </option>
        )}
        {options
          ?.filter((option) => option.name?.length > 0)
          .map((option) => (
            <option
              key={option.value}
              value={option.value}
              selected={option.selected}
              disabled={option.disabled}
            >
              {option.name}
            </option>
          ))}
      </select>

      <p>{error}</p>
    </Styles.Container>
  )
}

export default forwardRef<HTMLSelectElement, ISelectProps>(Select)
