import styled from 'styled-components'

export const ModuleModalContainer = styled.div`
  position: relative;

  .exercise {
    .exercise-wrapper {
      margin-bottom: 1rem;

      > p {
        margin-bottom: 1rem;
        font-weight: 400;

        margin-left: 0.75rem;
        margin-top: 0.25rem;
      }
    }
  }

  .dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .dot {
      width: 6px;
      height: 6px;

      background: ${({ theme }) => theme.colors.neutral[300]};

      border-radius: 50%;

      margin-top: 2rem;

      &.active {
        background: ${({ theme }) => theme.colors.white[500]};
      }
    }
  }

  .well-done-wrapper {
    text-align: center;

    > p {
      margin-bottom: 2rem;
    }
  }
`
