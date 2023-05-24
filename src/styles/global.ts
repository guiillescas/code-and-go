import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    background: '$GREY_DARK',
    color: 'white',
  },

  'body, input, textarea, button': {
    fontFamily: 'IBM Plex Sans',
    fontWeight: 400,
  },
})
