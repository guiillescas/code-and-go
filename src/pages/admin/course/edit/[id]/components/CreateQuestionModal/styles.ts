import styled from 'styled-components'

export const CreateQuestionModalContainer = styled.div`
  .alternatives {
    margin-bottom: 2rem;

    p {
      display: block;
      font-size: 1.15rem;
      margin-bottom: 0.25rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.neutral[100]};
    }

    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;

      margin: 1.25rem 0;

      tr:nth-child(even) {
        background: ${({ theme }) => theme.colors.neutral[500]};
      }

      .alternative {
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
