import { createSlice } from "@reduxjs/toolkit";
import { addOrderCaseReducer, loginCaseReducer, logoutCaseReducer } from "./reducers";
import { userInitialState } from "./state";

const UserReducerSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    login: loginCaseReducer,
    logout: logoutCaseReducer,
    addOrder: addOrderCaseReducer,
  },
});

export const { login, logout, addOrder } = UserReducerSlice.actions;

export const UserReducer = UserReducerSlice.reducer;