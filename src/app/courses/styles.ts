import { styled } from 'styles'

export const CoursesContainer = styled('main', {
  width: '100%',
  maxWidth: '1024px',
  margin: '2rem auto',
})

export const CoursesWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 340fr))',
  gap: '1.25rem',

  marginTop: '1.5rem',
})
