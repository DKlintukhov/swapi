import { configureStore } from '@reduxjs/toolkit';
import { swAPI } from './swAPI/swAPI';

export const store = configureStore({
  reducer: {
    [swAPI.reducerPath]: swAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swAPI.middleware),
});
