import { createSlice } from "@reduxjs/toolkit";
import { addFoodToRestaurantCaseReducer, addOrderCaseReducer, addRestaurantToUserCaseReducer, loginCaseReducer, logoutCaseReducer, setIsInputErrorCaseReducer } from "./reducers";
import { userInitialState } from "./state";

const UserReducerSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    login: loginCaseReducer,
    logout: logoutCaseReducer,
    addOrder: addOrderCaseReducer,
    addRestaurantToUser: addRestaurantToUserCaseReducer,
    setIsInputError: setIsInputErrorCaseReducer,
    addFoodToRestaurant: addFoodToRestaurantCaseReducer,
  },
});

export const { login, logout, addOrder, addRestaurantToUser, addFoodToRestaurant, setIsInputError } = UserReducerSlice.actions;

export const UserReducer = UserReducerSlice.reducer;