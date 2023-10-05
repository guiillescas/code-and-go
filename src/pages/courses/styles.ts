import styled from 'styled-components'

export const CoursesContainer = styled.main`
  width: 100%;
  max-width: 1024px;
  margin: 2rem auto;

  .loading-wrapper {
    width: 100%;

    margin: 2rem auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      margin-top: 1rem;
    }
  }
`

export const CoursesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 340fr));
  gap: 1.25rem;

  margin-top: 1.5rem;

  .message-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`
