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

    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;

    > div {
      > h2 {
        margin-bottom: 1rem;
      }

      &.left {
        > p {
          text-align: center;
          color: ${({ theme }) => theme.colors.neutral[100]};
          margin-top: 1.5rem;
        }
      }
      &.right {
      }
    }
  }
`

export const RankingPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  .image-wrapper {
    width: 50px;
    height: 50px;

    border-radius: 50%;

    img {
      border-radius: 50%;
      object-fit: contain;
    }
  }
`
