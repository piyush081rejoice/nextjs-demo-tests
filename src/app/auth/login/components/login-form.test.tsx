import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';

import LoginForm from './login-form';
import { login } from '@/common/lib/redux/reducers/auth-slice';
import '@testing-library/jest-dom';

jest.mock('@/common/lib/redux/reducers/auth-slice', () => ({
  login: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/common/lib/redux/reducers/auth-slice', () => ({
  login: jest.fn(),
}));

const mockAuthReducer = (state = { loading: false, error: null }, action: any) => {
  switch (action.type) {
    case 'auth/login/pending':
      return { ...state, loading: true, error: null };
    case 'auth/login/fulfilled':
      return { ...state, loading: false, error: null };
    case 'auth/login/rejected':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: mockAuthReducer,
    },
    preloadedState: {
      auth: { loading: false, error: null, ...initialState },
    },
  });
};

const TestWrapper = ({ children, initialState = {} }: any) => {
  const store = createMockStore(initialState);
  return <Provider store={store}>{children}</Provider>;
};

describe('LoginForm', () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockDispatch.mockClear();
    mockPush.mockClear();
    (login as unknown as jest.Mock).mockClear();
  });

  it('renders login form with all elements', () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Forgot password?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('displays default values in form fields', () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const usernameInput = screen.getByPlaceholderText('Username') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;

    expect(usernameInput.value).toBe('michaelw');
    expect(passwordInput.value).toBe('michaelwpass');
  });

  it('toggles password visibility when eye icon is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: '' });

    expect(passwordInput.type).toBe('password');

    await user.click(toggleButton);
    expect(passwordInput.type).toBe('text');

    await user.click(toggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('validates username minimum length', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    await user.clear(usernameInput);
    await user.type(usernameInput, 'user');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Username must be at least 6 characters')).toBeInTheDocument();
    });
  });

  it('validates password minimum length', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });

    await user.clear(passwordInput);
    await user.type(passwordInput, 'pass');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
  });

  it('shows loading state during form submission', () => {
    render(
      <TestWrapper initialState={{ loading: true }}>
        <LoginForm />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: 'Signing in...' });
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });

  it('displays error message when login fails', () => {
    const errorMessage = 'Invalid credentials';
    render(
      <TestWrapper initialState={{ error: errorMessage }}>
        <LoginForm />
      </TestWrapper>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders forgot password link', () => {
    render(
      <TestWrapper>
        <LoginForm />
      </TestWrapper>
    );

    const forgotPasswordLink = screen.getByText('Forgot password?');
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink.tagName).toBe('BUTTON');
  });
});