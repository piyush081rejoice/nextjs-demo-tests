"use client"
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'

import { makeStore } from '@/common/lib/redux/store'
import theme from '@/common/theme'

const store = makeStore()

// A wrapper for all client side Providers, separated so that it doesn't the app/layout.tsx a client component
const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme} defaultMode='light'>
        {children}
      </ThemeProvider>
    </Provider>
  )
}

export default ClientProviders