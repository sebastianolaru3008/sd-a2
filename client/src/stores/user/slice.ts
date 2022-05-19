import { createSlice } from '@reduxjs/toolkit';
import {
    addFoodToRestaurantCaseReducer,
    addOrderCaseReducer,
    addRestaurantToUserCaseReducer,
    loginCaseReducer,
    logoutCaseReducer,
    setIsInputErrorCaseReducer,
    setOrderStatusCaseReducer,
} from './reducers';
import { userInitialState } from './state';

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
        setOrderStatus: setOrderStatusCaseReducer,
    },
});

export const {
    login,
    logout,
    addOrder,
    addRestaurantToUser,
    addFoodToRestaurant,
    setIsInputError,
    setOrderStatus,
} = UserReducerSlice.actions;

export const UserReducer = UserReducerSlice.reducer;
