import styled from 'styled-components'

interface InlineCardContainerProps {
  disabled: boolean
}

export const InlineCardContainer = styled.button<InlineCardContainerProps>`
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

  opacity: ${({ disabled }) => (!disabled ? 1 : 0.6)};

  &:hover {
    border-color: ${({ theme, disabled }) =>
      !disabled && theme.colors.green[500]};
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }
`
