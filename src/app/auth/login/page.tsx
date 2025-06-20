import { Box, Button, Typography } from '@mui/material';
import { type Metadata } from 'next';
import React from 'react';

import LoginForm from './components/login-form';

export const metadata: Metadata = {
  title: 'Login'
}

const LoginPage: React.FC = () => {

  return (
    <Box sx={{ padding: { xs: 3, sm: 4 } }}>
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: '#0f172a',
            mb: 1,
            fontSize: { xs: '1.5rem', sm: '1.75rem' }
          }}
        >
          Welcome back
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#64748b',
            fontSize: '0.875rem'
          }}
        >
          Please sign in to your account
        </Typography>
      </Box>

      {/* Form */}
      <LoginForm />

      {/* Footer */}
      <Typography
        variant="body2"
        textAlign="center"
        sx={{
          color: '#64748b',
          fontSize: '0.8rem',
          mt: 3
        }}
      >
        Don&apos;t have an account?{' '}
        <Button
          variant="text"
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            color: '#3b82f6',
            padding: 0,
            minWidth: 'auto',
            fontSize: '0.8rem',
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#1d4ed8'
            }
          }}
        >
          Sign up
        </Button>
      </Typography>
    </Box>

  );
};

export default LoginPage;