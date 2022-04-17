import { PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../models/entities/Order';
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

export const setOrderStatusCaseReducer = (
    state: RestaurantsState,
    action: PayloadAction<Order>,
) => {
    if (state.currentRestaurant) {
        state.currentRestaurant.orders = state.currentRestaurant.orders.map(
            order => {
                if (order.id === action.payload.id) {
                    return action.payload;
                }
                return order;
            },
        );
        state.restaurants = state.restaurants.map(restaurant => {
            if (restaurant.id === state.currentRestaurant!.id) {
                return state.currentRestaurant!;
            }
            return restaurant;
        });
    }
};
