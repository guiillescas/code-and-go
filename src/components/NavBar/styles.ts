import { styled } from 'styles'

export const NavBarContainer = styled('div', {
  background: '$DARK_700',
  width: '100%',

  '.content': {
    width: '100%',
    maxWidth: '1024px',
    margin: '0 auto',

    padding: '1rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '.left-side-wrapper': {
      display: 'flex',
      aligmItems: 'center',
      justifyContent: 'flex-start',

      '> p': {
        fontSize: '1.5rem',
        cursur: '',
      },

      '.burger-icon-wrapper': {
        marginLeft: '1rem',
      },

      '> nav': {
        marginLeft: '2rem',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '$3',

        '> a': {
          textDecoration: 'none',
          color: '$PRIMARY_500',

          '&:hover': {
            color: '$PRIMARY_600',
          },
        },
      },
    },

    '.right-side-wrapper': {
      '.profile-picture': {
        position: 'relative',
        borderRadius: '50%',

        display: 'flex',
        flexDirection: 'center',
        alignItems: 'center',

        cursor: 'pointer',

        '&:hover': {
          opacity: 0.8,
        },

        '> img': {
          borderRadius: '50%',
          border: '2px solid $PRIMARY_500',
        },
      },
    },
  },
})
