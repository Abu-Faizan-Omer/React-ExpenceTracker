import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = localStorage.getItem('token') || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage,
    isLoggedIn: !!tokenFromStorage,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
