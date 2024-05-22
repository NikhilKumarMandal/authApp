import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { registerApi } from './api'
import authSlice from './slices/authSlice'

export const store = configureStore({
    reducer: {
    user: authSlice,
    [registerApi.reducerPath]: registerApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(registerApi.middleware),
})


setupListeners(store.dispatch)