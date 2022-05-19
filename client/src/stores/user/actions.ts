import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { FoodDto } from '../../models/dto/FoodDto';
import { RestaurantDto } from '../../models/dto/RestaurantDto';
import {
    addFoodRequest,
    addRestaurantRequest,
    getRestaurantsRequest,
} from '../../services/RestaurantsService';
import {
    loginRequest,
    signupRequest,
    userRequest,
} from '../../services/UserService';
import { clearCart } from '../bill/slice';
import { setCurrentRestaurant, setRestaurants } from '../restaurants/slice';
import { restaurantsInitialState } from '../restaurants/state';
import { RootState } from '../store';
import {
    addFoodToRestaurant,
    addRestaurantToUser,
    login,
    logout,
    setIsInputError,
} from './slice';

export const loginUser =
    (
        email: string,
        password: string,
    ): ThunkAction<void, RootState, null, AnyAction> =>
    async dispatch => {
        try {
            const loginResponse = await loginRequest(email, password);

            console.log(loginResponse);

            localStorage.setItem(
                'accessToken',
                `Bearer ${loginResponse.accessToken}`,
            );
            localStorage.setItem(
                'refreshToken',
                `Bearer ${loginResponse.refreshToken}`,
            );

            const user = await userRequest();

            dispatch(login(user));

            const getRestaurantsResponse = await getRestaurantsRequest();

            dispatch(setRestaurants(getRestaurantsResponse));
            dispatch(setIsInputError(false));
        } catch (error) {
            console.log('Error:', error);
            dispatch(setIsInputError(true));
        }
    };

export const signupUser =
    (
        email: string,
        password: string,
    ): ThunkAction<void, RootState, null, AnyAction> =>
    async dispatch => {
        try {
            const response = await signupRequest(email, password);
            if (response !== undefined) {
                dispatch(login(response));
            }
            dispatch(setIsInputError(false));
        } catch (error) {
            console.log('Error:', error);
            dispatch(setIsInputError(true));
        }
    };

export const logoutUser =
    (): ThunkAction<void, RootState, null, AnyAction> => async dispatch => {
        try {
            dispatch(logout());
            dispatch(setRestaurants(restaurantsInitialState.restaurants));
            dispatch(
                setCurrentRestaurant(restaurantsInitialState.currentRestaurant),
            );
            dispatch(clearCart());

            localStorage.removeItem('accessToken');
        } catch (error) {
            console.log('Error:', error);
        }
    };

export const addRestaurant =
    (
        name: string,
        location: string,
        adminId: string,
        onClose: () => void,
    ): ThunkAction<void, RootState, null, AnyAction> =>
    async dispatch => {
        try {
            const data = {
                name: name,
                location: location,
                adminId: adminId,
            } as RestaurantDto;
            const response = await addRestaurantRequest(data);

            dispatch(addRestaurantToUser(response));
            dispatch(setIsInputError(false));
            onClose();
        } catch (error) {
            dispatch(setIsInputError(true));
            console.log('Error:', error);
        }
    };

export const addFood =
    (
        name: string,
        description: string,
        category: string,
        price: number,
        restaurantId: string,
        onClose: () => void,
    ): ThunkAction<void, RootState, null, AnyAction> =>
    async dispatch => {
        try {
            const data = {
                name: name,
                description: description,
                category: category,
                price: price,
                restaurantId: restaurantId,
            } as FoodDto;
            const response = await addFoodRequest(data);

            dispatch(
                addFoodToRestaurant({
                    food: response,
                    restaurantId: restaurantId,
                }),
            );
            dispatch(setIsInputError(false));
            onClose();
        } catch (error) {
            console.log('Error:', error);
            dispatch(setIsInputError(true));
        }
    };
