import styled from 'styled-components'

export const CourseContainer = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;

  width: 100%;
  max-width: 1024px;
  margin: 0 auto;

  > section {
    width: 100%;

    h1 {
      margin: 1.5rem 0 2rem;
      font-size: 2rem;
    }

    > .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;

      width: 100%;

      margin-top: 1rem;

      > h2 {
        font-size: 1.5rem;
      }
    }
  }

  .ranking-wrapper {
    > h2 {
      margin-bottom: 1rem;
    }
  }
`

export const RankingPosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background: ${({ theme }) => theme.colors.neutral[700]};

  padding: 1rem;

  border-radius: 6px;

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
