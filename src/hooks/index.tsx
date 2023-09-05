import { ReactElement, ReactNode } from 'react'

import { ThemeProvider } from 'styled-components'

import { theme } from 'styles/themes/default'

import { AuthProvider } from './useAuth'
import { CourseProvider } from './useCourse'

interface AppProviderProps {
  children: ReactNode
}

export default function AppProvider({
  children,
}: AppProviderProps): ReactElement {
  return (
    <AuthProvider>
      <CourseProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CourseProvider>
    </AuthProvider>
  )
}
