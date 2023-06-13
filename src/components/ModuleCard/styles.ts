import styled from 'styled-components'

export const ModuleCardContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding: 1rem;

  background: ${({ theme }) => theme.colors.neutral[700]};

  border: 1px solid ${({ theme }) => theme.colors.neutral[700]};
  border-radius: 6px;

  transition: border 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.green[500]};
    cursor: pointer;
  }
`
