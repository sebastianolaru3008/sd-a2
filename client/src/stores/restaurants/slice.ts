import { createSlice } from '@reduxjs/toolkit';
import {
    setCurrentRestaurantCaseReducer,
    setOrderStatusCaseReducer,
    setRestaurantsCaseReducer,
} from './reducers';
import { restaurantsInitialState } from './state';

const RestaurantsReducerSlice = createSlice({
    name: 'restaurants',
    initialState: restaurantsInitialState,
    reducers: {
        setRestaurants: setRestaurantsCaseReducer,
        setCurrentRestaurant: setCurrentRestaurantCaseReducer,
        setOrderStatus: setOrderStatusCaseReducer,
    },
});

export const { setRestaurants, setCurrentRestaurant, setOrderStatus } =
    RestaurantsReducerSlice.actions;

export const RestaurantsReducer = RestaurantsReducerSlice.reducer;
