"use client"
import React, { useState, FormEvent, type ChangeEvent } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Stack
} from '@mui/material';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt:', { email, password });
    }, 1500);
  };

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
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3} mb={2}>
              <TextField
                fullWidth
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value)}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e2e8f0',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#cbd5e1'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '16px 18px',
                    fontSize: '0.95rem',
                    '&::placeholder': {
                      color: '#94a3b8',
                      opacity: 1
                    }
                  }
                }}
              />

              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: '#94a3b8' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e2e8f0',
                      borderWidth: 2
                    },
                    '&:hover fieldset': {
                      borderColor: '#cbd5e1'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                    }
                  },
                  '& .MuiOutlinedInput-input': {
                    padding: '16px 18px',
                    fontSize: '0.95rem',
                    '&::placeholder': {
                      color: '#94a3b8',
                      opacity: 1
                    }
                  }
                }}
              />
            </Stack>

            <Box textAlign="right" mb={3}>
              <Button
                variant="text"
                sx={{
                  textTransform: 'none',
                  color: '#3b82f6',
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  padding: 0,
                  minWidth: 'auto',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#1d4ed8'
                  }
                }}
              >
                Forgot password?
              </Button>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
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
                }
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Box>

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
            Don't have an account?{' '}
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
      </Card>
    </Box>
  );
};

export default LoginPage;