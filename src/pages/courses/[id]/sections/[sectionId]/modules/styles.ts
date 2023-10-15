import styled from 'styled-components'

export const CourseContainer = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  max-width: 1024px;
  margin: 0 auto;

  > section {
    width: 100%;

    h1 {
      margin: 1.5rem 0 2rem;
      font-size: 2rem;
    }

    > .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;

      width: 100%;

      margin-top: 1rem;

      .exercise,
      .question {
        margin: 1rem 0 2rem;
      }

      .exercise {
        .exercise-wrapper {
          margin-bottom: 1rem;

          > p {
            margin-bottom: 1rem;
            font-weight: 700;
          }
        }
      }

      > h2 {
        font-size: 1.5rem;
      }
    }
  }
`

export const ModuleCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  background: ${({ theme }) => theme.colors.neutral[700]};

  border-radius: 6px;

  padding: 1rem;

  > p {
    font-weight: bold;
    font-size: 1.125rem;
  }

  > button {
    width: fit-content;

    padding: 0 1rem;
  }
`
