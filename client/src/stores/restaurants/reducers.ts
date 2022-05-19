import { PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '../../models/entities/Restaurant';
import { RestaurantsState } from './state';

export const setRestaurantsCaseReducer = (
    state: RestaurantsState,
    action: PayloadAction<Restaurant[]>,
) => {
    state.restaurants = action.payload;
};

export const setCurrentRestaurantCaseReducer = (
    state: RestaurantsState,
    action: PayloadAction<Restaurant | null>,
) => {
    state.currentRestaurant = action.payload;
};
