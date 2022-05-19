import { PayloadAction } from '@reduxjs/toolkit';
import { Food } from '../../models/entities/Food';
import { Order } from '../../models/entities/Order';
import { Restaurant } from '../../models/entities/Restaurant';
import { User } from '../../models/entities/User';
import { userInitialState, UserState } from './state';

export const loginCaseReducer = (
    state: UserState,
    action: PayloadAction<User>,
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
    action: PayloadAction<Order>,
) => {
    state.user.orders.push(action.payload);
};

export const addRestaurantToUserCaseReducer = (
    state: UserState,
    action: PayloadAction<Restaurant>,
) => {
    state.user.restaurants.push(action.payload);
};

export const addFoodToRestaurantCaseReducer = (
    state: UserState,
    action: PayloadAction<{ food: Food; restaurantId: string }>,
) => {
    state.user.restaurants = state.user.restaurants.map(restaurant => {
        if (restaurant.id === action.payload.restaurantId) {
            if (!restaurant.foods) {
                restaurant.foods = [];
            }
            restaurant.foods.push(action.payload.food);
        }
        return restaurant;
    });
};

export const setIsInputErrorCaseReducer = (
    state: UserState,
    action: PayloadAction<boolean>,
) => {
    state.isInputError = action.payload;
};

export const setOrderStatusCaseReducer = (
    state: UserState,
    action: PayloadAction<Order>,
) => {
    state.user.restaurants[0].orders = state.user.restaurants[0].orders.map(
        (order: Order) => {
            if (order.id === action.payload.id) {
                return action.payload;
            }
            return order;
        },
    );
};
