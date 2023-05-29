import { createStitches, defaultThemeMap } from '@stitches/react'

import { fontSizes } from 'tokens/font-sizes'
import { fontWeights } from 'tokens/font-weights'
import { fonts } from 'tokens/fonts'
import { lineHeights } from 'tokens/line-heights'
import { radii } from 'tokens/radii'
import { space } from 'tokens/space'

export const {
  config,
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
} = createStitches({
  themeMap: {
    ...defaultThemeMap,
    width: 'space',
    height: 'space',
  },
  theme: {
    colors: {
      DARK_100: '#adb5bd',
      DARK_300: '#6c757d',
      DARK_500: '#495057',
      DARK_700: '#343a40',
      DARK_900: '#212529',

      PRIMARY_500: '#F7F7FF',
      PRIMARY_600: '#e4e4e4',

      SECONDARY_100: '#D8F3EE',
      SECONDARY_300: '#8ADBCB',
      SECONDARY_500: '#3BC4A9',
      SECONDARY_700: '#247565',
      SECONDARY_900: '#0C2722',
    },
    fontSizes,
    fontWeights,
    fonts,
    lineHeights,
    radii,
    space,
  },
  media: {
    bp1: '(max-width: 640px)',
    bp2: '(max-width: 768px)',
    bp3: '(max-width: 1024px)',
  },
})
