import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/common/lib/redux/reducers/auth-slice';

// Creates and configures the Redux store with the root reducer and middleware
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']