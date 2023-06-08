import { styled } from 'styles'

export const CourseContainer = styled('main', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',

  width: '100%',
  maxWidth: '1024px',
  margin: '0 auto',

  marginTop: '4rem',

  '> section': {
    width: '100%',

    '> .content': {
      width: '100%',

      marginTop: '1rem',
    },
  },
})
