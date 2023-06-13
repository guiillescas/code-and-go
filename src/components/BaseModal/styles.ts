import Modal from 'react-modal'

import { ContainerProps } from './types'

import styled from 'styled-components'

export const Container = styled(Modal) <ContainerProps>`
  position: relative;

  width: ${({ maxWidth }) => (maxWidth ? '100%' : 'fit-content')};
  max-width: ${({ maxWidth }) => maxWidth && maxWidth}px;
  height: ${({ maxHeight }) => (maxHeight ? '100%' : 'fit-content')};
  max-height: ${({ maxHeight }) => maxHeight && maxHeight}px;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.neutral[700]};
  border-radius: 1rem;
  z-index: 1500;

  @media(max-width: 768px) {
    padding: 1.5rem;
    margin: 0.5rem 1rem;

    height: fit-content;
  }

  .header {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1.5rem;

    h1 {
      width: 90%;

      line-height: 1.75rem;
      font-size: 1.75rem;
      color: ${({ theme }) => theme.colors.white[500]};
    }

    button {
      border: 0;
      background: transparent;

      transition: filter 0.1s;
      z-index: 1600;
      cursor: pointer;

      color: ${({ theme }) => theme.colors.neutral[100]};

      &:hover {
        filter: brightness(0.8);
      }
    }
  }

  .separator {
    border-bottom: 1px ${({ theme }) => theme.colors.neutral[100]} solid;
  }

  .children {
    padding: 1.5rem;

    color: ${({ theme }) => theme.colors.neutral[100]};
  }
`
