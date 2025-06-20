import {
  ButtonProps,
  Button as MUIButton
} from '@mui/material';

// Theme styled MUI Button component
export default function Button({ sx, ...props }: ButtonProps) {
  return <MUIButton
    sx={{
      py: 2,
      borderRadius: 4,
      textTransform: 'none',
      fontSize: '0.95rem',
      fontWeight: 500,
      backgroundColor: '#0f172a',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#1e293b',
        boxShadow: 'none',
        transform: 'translateY(-1px)'
      },
      '&:active': {
        transform: 'translateY(0)'
      },
      '&:disabled': {
        backgroundColor: '#0f172a',
        opacity: 0.8,
        color: 'white'
      },
      ...sx
    }}
    {...props}
  />

}