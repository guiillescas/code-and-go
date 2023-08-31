import styled, { css } from 'styled-components'

import { ButtonContainerProps, ButtonVariantsEnum } from './types'

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100%;
  height: 43px;

  color: ${({ theme }) => theme.colors.white[500]};

  border: none;
  border-radius: 4px;

  font-size: 16px;
  line-height: 20px;

  cursor: pointer;

  transition: opacity 0.2s;

  opacity: ${({ isLoading }) => (isLoading ? 0.8 : 1)};

  ${({ variant }) => {
    switch (variant) {
      case ButtonVariantsEnum.DEFAULT:
        return css`
          background: ${({ theme }) => theme.colors.primary[500]};
        `

      case ButtonVariantsEnum.PRIMARY:
        return css`
          background: ${({ theme }) => theme.colors.green[700]};
        `
    }
  }}

  ${({ isLoading }) => {
    if (isLoading) {
      return css`
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: not-allowed;
      `
    }
  }}

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  @media (max-width: 1024px) {
    font-size: 12px;
  }
`
