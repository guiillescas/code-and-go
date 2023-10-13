import styled from 'styled-components'

export const AdminCourseContainer = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 2rem;

    > div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;

      > button {
        width: fit-content;
        padding: 0 1rem;
      }
    }
  }

  section {
    margin-bottom: 2rem;
  }

  #course {
    p {
      margin-bottom: 0.5rem;
    }
  }

  .divider {
    width: 100%;
    height: 2px;

    background: ${({ theme }) => theme.colors.neutral[500]};

    border-radius: 6px;

    margin: 1rem 0;
  }

  #sections {
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      > button {
        max-width: 200px;
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

      .section {
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
