import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type TUser = {
  username: string;
  useremail: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
  role: null | string;
  payload: null | any; // Added this line to store full payload
};

const initialState: TAuthState = {
  user: null,
  token: null,
  role: null,
  payload: null, // Initialize payload in initial state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action)
      const { user, token, role, number, address, ...payload } = action.payload; // Destructure to get other payload fields
      state.user = user;
      state.token = token;
      state.role = role;
      state.payload = payload; // Store the remaining payload
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.payload = null; // Reset payload on logout
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentRole = (state: RootState) => state.auth.role;
export const userFullInformation = (state: RootState) => state.auth.payload; // Selector to get full payload
