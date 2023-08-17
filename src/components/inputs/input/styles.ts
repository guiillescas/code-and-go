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
    color: ${({ theme }) => theme.colors.neutral[100]};
  }

  input {
    width: 100%;

    border: 1px solid
      ${({ theme, error }) =>
        error ? theme.colors.error[500] : theme.colors.neutral[300]};
    border-radius: 6px;

    color: ${({ theme }) => theme.colors.neutral[100]};
    font-size: 1rem;
    font-weight: initial;

    padding: 12px 16px;

    height: 100%;
    max-height: 40px;

    margin-bottom: 0 !important;

    transition: border-color 0.1s;

    &:disabled {
      border: none;
      color: ${({ theme }) => theme.colors.neutral[100]};
    }

    &::placeholder,
    &::-webkit-input-placeholder {
      color: ${({ theme }) => theme.colors.neutral[100]};
    }
  }

  p {
    height: 14px;
    margin-top: 0.1rem;
    color: ${({ theme, error }) =>
      error ? theme.colors.error[500] : 'transparent'};

    transition: color 0.1s;
  }
`
