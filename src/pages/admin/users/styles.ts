import styled from 'styled-components'

export const AdminUsersContainer = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > button {
      max-width: 120px;
    }
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;

    margin-top: 1.25rem;

    tr:nth-child(even) {
      background: ${({ theme }) => theme.colors.neutral[500]};
    }

    .course {
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
`
