import { FoodOrderItem } from '../../models/entities/FoodOrderItem';

export interface BillState {
    cartItems: FoodOrderItem[];
}

export const billInitialState: BillState = {
    cartItems: [],
};
