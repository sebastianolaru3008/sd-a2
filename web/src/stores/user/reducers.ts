import { UserState } from "./state";

export const loginCaseReducer = (
  state: UserState
) => {
  state.isLoggedIn = true;
};

export const logoutCaseReducer = (state: UserState) => {
  state.isLoggedIn = false;
};