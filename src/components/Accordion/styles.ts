import styled from 'styled-components'

import { AccordionContainerProps } from './types'

export const AccordionContainer = styled.div<AccordionContainerProps>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  width: 100%;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    border-radius: 6px 6px 0 0;
    padding: 1rem;

    background: ${({ theme }) => theme.colors.neutral[700]};
    
    box-shadow: 0 20px 100px -20px #000;
    
    &:hover {
      cursor: pointer;

      background: $DARK_500;

      background: ${({ theme }) => theme.colors.neutral[500]};

      transition: background-color 0.2s;
    }
  }

  > .content {
    width: 100%;
    height: ${({ isOpen }) => isOpen ? 'fit-content' : '0px'};

    overflow: auto;

    padding: ${({ isOpen }) => isOpen ? '0.75rem 1rem' : '0px'};

    background: ${({ theme }) => theme.colors.neutral[700]};

    animation: all 0.2s;
  }
`
