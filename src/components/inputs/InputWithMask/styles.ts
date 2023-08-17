import styled from 'styled-components'

import { ContainerProps } from './types'

export const Container = styled.div<ContainerProps>`
  width: 100%;

  margin-bottom: 0.5rem;

  label {
    display: block;
    font-size: 1.15rem;
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  input {
    width: 100%;
    border: 1px;
    border-style: solid;
    border-color: ${({ theme, error }) =>
      error ? theme.colors.green[500] : theme.colors.neutral[300]};
    border-radius: 6px;

    font-size: 1rem;
    font-weight: initial;

    padding: 12px 16px;

    height: 100%;
    max-height: 40px;

    margin-bottom: 0 !important;

    transition: border-color 0.1s;

    &:read-only {
      border: none;
    }
  }

  input[type='checkbox'] {
    height: 16px;
    max-width: 16px;

    margin-right: 10px;
    margin-left: 10px;
  }

  p {
    height: 14px;
    margin-top: 0.1rem;
    color: ${({ theme, error }) =>
      error ? theme.colors.green[500] : 'transparent'};

    transition: color 0.1s;
  }
`
