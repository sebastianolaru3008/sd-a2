import { PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../models/entities/Order";
import { User } from "../../models/entities/User";
import { userInitialState, UserState } from "./state";

export const loginCaseReducer = (
  state: UserState,
  action: PayloadAction<User>
) => {
  state.isLoggedIn = true;
  state.user = action.payload;
};

export const logoutCaseReducer = (state: UserState) => {
  state.isLoggedIn = false;
  state.user = userInitialState.user;
};

export const addOrderCaseReducer = (
  state: UserState,
  action: PayloadAction<Order>
) => {
  state.user.orders.push(action.payload)
};