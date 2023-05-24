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
      PRIMARY: '#E60A6E',
      GREY_BACKGROUND: '#151515',
      GREY_DARK: '#202020',
      GREY_LIGHT: '#3e3e3e',
      WHITE: '#FFF',
      WHITE_DARK: '#f2f2f2',
      WARNING: '#CD0000',
      LIGHT_PINK: '#FAA5C8',
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
