import styled from 'styled-components'

export const RightBarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  max-width: 280px;
  height: 100vh;

  background: ${({ theme }) => theme.colors.neutral[800]};

  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .image-wrapper {
    background: ${({ theme }) => theme.colors.neutral[900]};

    border-radius: 50%;

    width: 180px;
    height: 180px;

    display: flex;
    align-items: center;
    justify-content: center;

    > img {
      border-radius: 50%;
    }
  }

  > h2 {
    margin: 1rem 0 2.5rem;
  }

  .box {
    background: ${({ theme }) => theme.colors.neutral[900]};

    border: 3px solid ${({ theme }) => theme.colors.neutral[700]};
    border-radius: 10px;

    padding: 1rem;
    margin-bottom: 1rem;

    width: 100%;

    .counters {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .friends-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      margin-top: 1rem;

      .friend {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        width: 100%;

        p {
          font-weight: bold;

          max-width: 120px;

          flex-wrap: nowrap;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        span {
          min-width: 60px;
        }
      }
    }
  }
`
