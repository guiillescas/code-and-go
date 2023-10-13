import styled from 'styled-components'

export const WelcomeContainer = styled.div`
  > h1 {
    margin-bottom: 4rem;
  }

  form {
    margin-top: 2rem;

    max-width: 768px;
    margin: 0 auto;

    > p {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    > button {
      margin-top: 0.5rem;
    }
  }

  #courses {
    width: 100%;
    margin: 2rem 0;

    > p {
      text-align: center;
    }
  }
`

export const CoursesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 340fr));
  gap: 1.25rem;

  margin-top: 1.5rem;

  > p {
    text-align: center;
  }
`
