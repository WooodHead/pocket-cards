import { Consts } from '@constants';
import { createSlice } from '@reduxjs/toolkit';
import { Domains } from 'typings';
import * as UserActions from './userActions';

const userState: Domains.UserState = {
  // login status: Not login
  loginStatus: Consts.SIGN_STATUS.NOT_LOGIN,
  // user name
  username: '',
};

const slice = createSlice({
  name: 'user',
  initialState: userState,
  reducers: {
    // Sign out
    SIGN_OUT: (state) => {
      state.loginStatus = Consts.SIGN_STATUS.NOT_LOGIN;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserActions.USER_SIGN_IN.fulfilled, (state, { payload }) => {
        // require mfa code
        if (payload.mfaRequired) {
          state.loginStatus = Consts.SIGN_STATUS.MFA_REQUIRED;
          state.password = payload.password;
        } else if (payload.newPasswordRequired) {
          // require new password
          state.loginStatus = Consts.SIGN_STATUS.NEW_PASSWORD_REQUIRED;
          state.password = payload.password;
        } else if (payload.success === 'true') {
          state.loginStatus = Consts.SIGN_STATUS.LOGINED;
        }

        state.username = payload.username;
      })
      .addCase(UserActions.USER_SIGN_UP.fulfilled, (state, { payload }) => {
        console.log('SIGN UP Success');
      });
  },
});

export default slice;
