'use client'
import { createTheme } from '@mui/material/styles'

// If default style of MUI components and styles are modified,
// they are imported and used here, and stored at @common/theme/button

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-inter-tight)',
  },
})

export default theme
