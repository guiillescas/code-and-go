import styled from 'styled-components'

export const RankingContainer = styled.div`
  > h1 {
    margin-bottom: 1rem;
  }

  > h2 {
    margin-bottom: 0.5rem;
  }

  form {
    margin-top: 4rem;
  }

  .ranking {
    border: 3px solid ${({ theme }) => theme.colors.neutral[700]};
    border-radius: 10px;

    padding: 1rem;
    margin-top: 2rem;

    > h3 {
      margin-bottom: 1rem;
    }

    .position {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin: 0.5rem 0;

      p:first-child {
        font-weight: bold;

        > .index {
          margin-right: 1rem;
        }

        .medal {
          font-size: 1.25rem;
        }
      }
    }
  }
`
