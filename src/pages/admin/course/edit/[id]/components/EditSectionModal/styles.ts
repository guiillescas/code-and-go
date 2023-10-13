import styled from 'styled-components'

export const EditSectionModalContainer = styled.div`
  max-height: 90vh;
  overflow-y: auto;

  p {
    margin-bottom: 0.5rem;
  }

  #modules {
    margin-top: 1.5rem;

    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;

      margin-top: 1.25rem;

      tr:nth-child(even) {
        background: ${({ theme }) => theme.colors.neutral[500]};
      }

      .module {
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

    > button {
      margin-top: 0.5rem;

      max-width: 200px;
    }
  }

  #module {
    margin-top: 1.5rem;

    form {
      margin-top: 0.75rem;

      .buttons-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
    }
  }
`
