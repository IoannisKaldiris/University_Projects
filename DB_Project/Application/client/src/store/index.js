import { configureStore } from '@reduxjs/toolkit';

// Reducers
import userReducer from './slices/user.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
