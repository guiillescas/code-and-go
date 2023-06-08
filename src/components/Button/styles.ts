import { styled } from 'styles'

export const Button = styled('button', {
  width: '100%',
  height: '43px',

  backgroundColor: '$SECONDARY_700',
  color: '$PRIMARY_500',

  border: 'none',
  borderRadius: '4px',

  fontSize: '16px',
  lineHeight: '20px',

  cursor: 'pointer',

  transition: 'opacity 0.2s',

  variants: {
    isLoading: {
      true: {
        opacity: 0.7,
        cursor: 'not-allowed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      false: {
        opacity: 1,
      },
    },
  },

  '&:hover:not(:disabled)': {
    opacity: 0.8,
  },

  '@bp3': {
    fontSize: '12px',
  },
})
