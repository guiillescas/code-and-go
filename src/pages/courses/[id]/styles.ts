import styled from 'styled-components'

export const CourseContainer = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  max-width: 1024px;
  margin: 0 auto;

  margin-top: 4rem;

  > section {
    width: 100%;

    h1 {
      margin-top: 1.5rem;
    }

    > .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 1rem;

      width: 100%;

      margin-top: 1rem;
    }
  }
`
