import styled from 'styled-components'

export const CoursesContainer = styled.main`
  width: 100%;
  max-width: 1024px;
  margin: 2rem auto;
`

export const CoursesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 340fr));
  gap: 1.25rem;

  margin-top: 1.5rem;
`
