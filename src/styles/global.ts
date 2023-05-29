import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
  },

  body: {
    '-webkit-font-smoothing': 'antialiased',
    background: '$DARK_900',
    color: 'white',
  },

  'body, input, textarea, button': {
    fontFamily: 'IBM Plex Sans',
    fontWeight: 400,
  },
})
