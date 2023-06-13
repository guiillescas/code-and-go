/* eslint-disable prettier/prettier */
import 'styled-components'
import { theme } from '../styles/themes/default'

export type ThemeInterface = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface { }
}
