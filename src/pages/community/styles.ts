import styled from 'styled-components'

export const CommunityContainer = styled.div`
  width: 100%;
  max-width: 1024px;

  margin: 2rem auto;

  #add-friend {
    form {
      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-top: 1rem;

        input {
          border-radius: 6px 0 0 6px;
        }

        > button {
          width: fit-content;

          padding: 0 1rem;

          height: 40px;

          border-radius: 0 6px 6px 0;

          white-space: nowrap;
        }
      }
    }
  }

  #friends-requests {
    margin-top: 4rem;

    > h2 {
      margin-bottom: 1rem;
    }

    > p {
      text-align: center;
      color: ${({ theme }) => theme.colors.neutral[100]};
      margin-top: 1.5rem;
    }
  }
`
