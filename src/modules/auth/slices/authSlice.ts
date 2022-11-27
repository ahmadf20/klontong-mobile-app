import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State} from '../../../types/stateTypes';
import {storeUserSession} from '../services/userSessionStorage';

export type UserSession = {
  token?: string;
  username?: string;
};

const initialState: State<UserSession> = {
  data: {
    token: undefined,
    username: undefined,
  },
  status: 'loading',
  error: null,
};

const restoreTokenAction: CaseReducer<
  State<UserSession>,
  PayloadAction<UserSession>
> = (state, action) => {
  state.data = {
    token: action.payload.token,
    username: action.payload.username,
  };
  state.status = 'succeeded';
};

const loginAction: CaseReducer<
  State<UserSession>,
  PayloadAction<UserSession>
> = (state, action) => {
  storeUserSession(action.payload);
  state.data = {
    token: action.payload.token,
    username: action.payload.username,
  };
};

const logoutAction: CaseReducer<State<UserSession>, PayloadAction> = state => {
  state.data = {
    token: undefined,
    username: undefined,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    restoreToken: restoreTokenAction,
    login: loginAction,
    logout: logoutAction,
  },
});

export const authReducer = authSlice.reducer;
export const {login, logout, restoreToken} = authSlice.actions;
