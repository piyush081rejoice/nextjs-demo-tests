import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_ROUTES } from '@/common/utils/constants/apis';

type AuthState = {
  user: null | { username: string };
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  any,
  { username: string; password: string },
  { rejectValue: string }
>(API_ROUTES.AUTH_LOGIN, async (credentials, { rejectWithValue }) => {
  try {
    const loginPayload = {
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 30,
    };
    const res = await axios.post(API_ROUTES.BASE + API_ROUTES.AUTH_LOGIN, JSON.stringify(loginPayload), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      }
    }
    return rejectWithValue('Network error');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { username: action.payload.username };
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
