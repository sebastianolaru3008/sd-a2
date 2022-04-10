import { createSlice } from "@reduxjs/toolkit";
import { addToCartCaseReducer, clearCartCaseReducer, removeFromCartCaseReducer } from "./reducers";
import { billInitialState } from "./state";

const BillReducerSlice = createSlice({
  name: 'bill',
  initialState: billInitialState,
  reducers: {
    addToCart: addToCartCaseReducer,
    removeFromCart: removeFromCartCaseReducer,
    clearCart: clearCartCaseReducer,
  },
});

export const {addToCart, removeFromCart} = BillReducerSlice.actions;

export const BillReducer = BillReducerSlice.reducer;