import styled from 'styled-components'

export const InlineCardContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  width: 100%;

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
