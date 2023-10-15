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

    .possible-friends-list-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      .possible-friend-card {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;

        background: ${({ theme }) => theme.colors.neutral[700]};

        padding: 1rem;

        border-radius: 6px;

        > div {
          display: flex;
          align-items: center;
          justify-content: center;

          > span {
            margin-right: 1rem;
          }

          > a {
            margin-left: 1rem;

            color: ${({ theme }) => theme.colors.white[500]};

            transition: opacity 0.2s;

            &:hover {
              opacity: 0.8;
            }
          }
        }

        > button {
          max-width: 200px;
        }
      }
    }
  }

  #friends-requests {
    margin-top: 4rem;

    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 5rem;

    > div {
      > h2 {
        margin-bottom: 1rem;
      }

      &.left {
        width: 100%;

        > p {
          text-align: center;
          color: ${({ theme }) => theme.colors.neutral[100]};
          margin-top: 1.5rem;
        }
      }
    }
  }
`
