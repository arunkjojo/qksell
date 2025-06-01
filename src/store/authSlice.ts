import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthData, OtpCredentials } from '@common/types';

const initialState: AuthData = {
  authToken: '',
  authMobile: '',
  otp: {
    status: false
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthOtpCredentials: (state, action: PayloadAction<OtpCredentials>) => {
      state.otp = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    setAuthMobile: (state, action: PayloadAction<string>) => {
      state.authMobile = action.payload;
    }
  },
});

export const {
  setAuthOtpCredentials,
  setAuthToken,
  setAuthMobile
} = authSlice.actions;
export default authSlice.reducer;