import { createSlice } from "@reduxjs/toolkit";
import { billInitialState } from "./state";

const BillReducerSlice = createSlice({
  name: 'user',
  initialState: billInitialState,
  reducers: {
  },
});

export const {} = BillReducerSlice.actions;

export const BillReducer = BillReducerSlice.reducer;