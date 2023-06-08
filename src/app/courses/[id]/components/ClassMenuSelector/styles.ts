import { styled } from 'styles'

export const ClassMenuSelectorContainer = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',

  width: '100%',

  '.header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',

    borderRadius: '6px 6px 0 0',
    padding: '1rem',

    background: '$DARK_700',

    boxShadow: '0 20px 100px -20px #000',

    '&:hover': {
      background: '$DARK_500',
      cursor: 'pointer',
    },
  },

  '.content': {
    width: '100%',

    padding: '1rem',

    background: '$DARK_700',
  },
})
