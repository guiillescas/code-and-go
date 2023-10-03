import styled from 'styled-components'

export const CoffeeCounterContainer = styled.div`
  border-radius: 4px;

  padding: 0.5rem 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  background: ${({ theme }) => theme.colors.neutral[900]};

  p {
    font-weight: bold;
  }
`
