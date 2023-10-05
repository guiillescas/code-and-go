import styled from 'styled-components'

interface IContainerProps {
  error?: string
}

export const Container = styled.div<IContainerProps>`
  width: 100%;

  label {
    display: block;
    font-size: 1.15rem;
    margin-bottom: 0.25rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.neutral[100]};
  }

  select {
    width: 100%;

    border: 1px solid
      ${({ theme, error }) =>
        error ? theme.colors.primary[500] : theme.colors.neutral[300]};
    border-radius: 6px;

    background-color: ${({ theme }) => theme.colors.white[500]};

    font-size: 1rem;
    color: ${({ theme }) => theme.colors.neutral[900]};

    height: 100%;
    max-height: 44px;

    padding: 8px 16px;

    transition: border-color 0.1s;

    &:disabled {
      border: none;
      color: ${({ theme }) => theme.colors.neutral[300]};
    }
    &::placeholder,
    &::-webkit-input-placeholder {
      color: ${({ theme }) => theme.colors.neutral[300]};
    }
  }

  p {
    height: 14px;
    margin-top: 0.25rem;
    color: ${({ theme, error }) =>
      error ? theme.colors.primary[500] : 'transparent'};

    transition: color 0.1s;
  }
`
