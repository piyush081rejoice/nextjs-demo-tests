"use client"
import React from 'react'
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  Button as MUIButton,
  InputAdornment,
  Stack,
  TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppDispatch, RootState } from '@/common/lib/redux/store';
import { login } from '@/common/lib/redux/reducers/auth-slice';
import Button from '@/common/theme/button';

// Login Form validation schema using Zod
const loginSchema = z.object({
  username: z.string().min(6, { message: 'Username must be at least 6 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 8 characters' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

/**
 * LoginForm component
 * Handles user authentication with username and password
 * Uses React Hook Form with Zod validation
 * Integrates with Redux for state management
 */
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    // dispatching login action which itself handles validation and error handling
    const resultAction = await dispatch(login(data));
    if (login.fulfilled.match(resultAction)) {
      // redirecting to dashboard after successful login
      router.push('/dashboard');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >

      <Stack spacing={3} mb={2}>
        <TextField
          fullWidth
          type="text"
          placeholder="Username"
          defaultValue='michaelw'
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
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
          defaultValue='michaelwpass'
          {...register('password')}
          autoComplete="new-password"
          error={!!errors.password}
          helperText={errors.password?.message}
          variant="outlined"
          slotProps={{
            input: {
              autoComplete: 'new-password',
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
              ),
            }
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
        <MUIButton
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
        </MUIButton>
      </Box>

      {error && (
        <Box color="error.main" mb={2} textAlign="center">
          {error}
        </Box>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </Box>
  )
}

export default LoginForm