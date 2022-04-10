import { createSlice } from "@reduxjs/toolkit";
import { setCurrentRestaurantCaseReducer, setRestaurantsCaseReducer } from "./reducers";
import { restaurantsInitialState } from "./state";

const RestaurantsReducerSlice = createSlice({
  name: 'restaurants',
  initialState: restaurantsInitialState,
  reducers: {
    setRestaurants: setRestaurantsCaseReducer,
    setCurrentRestaurant: setCurrentRestaurantCaseReducer,
  },
});

export const {setRestaurants, setCurrentRestaurant} = RestaurantsReducerSlice.actions;

export const RestaurantsReducer = RestaurantsReducerSlice.reducer;