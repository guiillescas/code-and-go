import { ReactElement, ReactNode } from 'react'

import { ThemeProvider } from 'styled-components'

import { theme } from 'styles/themes/default'

import { AuthProvider } from './useAuth'

interface AppProviderProps {
  children: ReactNode
}

export default function AppProvider({
  children,
}: AppProviderProps): ReactElement {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AuthProvider>
  )
}
