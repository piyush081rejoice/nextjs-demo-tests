import { Box, Card, } from '@mui/material';

// A common Auth layout for all authentication related pages. eg. login, register, forgot password, reset password etc.
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 450,
          width: '100%',
          borderRadius: 6,
          backgroundColor: 'white',
          border: '1px solid #f1f5f9',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
        }}
      >
        {children}
      </Card>
    </Box>
  )
}

export default AuthLayout