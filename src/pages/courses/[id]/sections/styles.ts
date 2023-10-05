import styled from 'styled-components'

export const CourseContainer = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

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
`
