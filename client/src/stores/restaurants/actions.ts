import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import {
    changeOrderStatusRequest,
    getRestaurantsRequest,
} from '../../services/RestaurantsService';
import { RootState } from '../store';
import { setOrderStatus, setRestaurants } from './slice';

export const getRestaurants =
    (): ThunkAction<void, RootState, null, AnyAction> => async dispatch => {
        try {
            const response = await getRestaurantsRequest();

            dispatch(setRestaurants(response));
        } catch (error) {
            console.log('Error:', error);
        }
    };

export const changeOrderStatus =
    (
        orderId: string,
        orderStatus: string,
    ): ThunkAction<void, RootState, null, AnyAction> =>
    async dispatch => {
        try {
            console.log('🚀 ~ file: actions.ts ~ line 19 ~ orderId', orderId);
            console.log(
                '🚀 ~ file: actions.ts ~ line 19 ~ orderStatus',
                orderStatus,
            );
            const response = await changeOrderStatusRequest(
                orderId,
                orderStatus,
            );
            console.log('🚀 ~ file: actions.ts ~ line 23 ~ response', response);

            dispatch(setOrderStatus(response));
        } catch (error) {
            console.log('Error:', error);
        }
    };
