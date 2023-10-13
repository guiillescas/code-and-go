import styled from 'styled-components'

export const CreateExerciseModalContainer = styled.div`
  form {
    > p {
      display: block;
      font-size: 1.15rem;
      margin-bottom: 0.25rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.neutral[100]};
    }
  }

  .test-cases {
    margin-bottom: 2rem;

    > h2 {
      margin-top: 1.25rem;
    }

    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;

      margin: 1.25rem 0;

      tr:nth-child(even) {
        background: ${({ theme }) => theme.colors.neutral[500]};
      }

      .testCase {
        transition: background-color 0.1s;

        &:hover {
          background: ${({ theme }) => theme.colors.neutral[300]};
        }
      }

      td,
      th {
        border: none;
        text-align: left;
        padding: 8px;
      }

      .actions {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;

        > button {
          background: none;
          border: none;

          cursor: pointer;

          padding: 0.125rem;

          transition: opacity 0.1s;

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }
`
