import { PayloadAction } from '@reduxjs/toolkit';
import { Food } from '../../models/entities/Food';
import { FoodOrderItem } from '../../models/entities/FoodOrderItem';
import { BillState } from './state';

export const removeFromCartCaseReducer = (
    state: BillState,
    action: PayloadAction<string>,
) => {
    state.cartItems = state.cartItems
        .map(element => {
            if (element.item.id === action.payload) {
                return {
                    item: element.item,
                    quantity: element.quantity - 1,
                } as FoodOrderItem;
            } else {
                return element;
            }
        })
        .filter(element => element.quantity > 0);
};

export const addToCartCaseReducer = (
    state: BillState,
    action: PayloadAction<Food>,
) => {
    let found = false;
    const foodId = action.payload.id;
    state.cartItems = state.cartItems.map(element => {
        if (element.item.id === foodId) {
            found = true;
            return {
                item: element.item,
                quantity: element.quantity + 1,
            } as FoodOrderItem;
        } else {
            return element;
        }
    });

    if (!found) {
        state.cartItems.push({
            item: action.payload,
            quantity: 1,
        } as FoodOrderItem);
    }
};

export const clearCartCaseReducer = (state: BillState) => {
    state.cartItems = [];
};
