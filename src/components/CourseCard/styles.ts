import { styled } from 'styles'

export const CourseCardContainer = styled('div', {
  '.image-wrapper': {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '200px',
    maxHeight: '230px',

    '> img': {
      width: '100%',
      height: '100%',
      minHeight: '200px',
      maxHeight: '230px',

      objectFit: 'cover',

      borderRadius: '8px 8px 0 0',
    },
  },

  '.content': {
    display: 'flex',
    flexDirection: 'column',

    marginTop: '1rem',

    '> p': {
      marginTop: '0.75rem',
    },

    '> button': {
      marginTop: '0.75rem',
    },
  },
})
