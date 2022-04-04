import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { BillReducer } from "./bill/slice";
import { BillState } from "./bill/state";
import { UserReducer } from "./user/slice";
import { UserState } from "./user/state";

export interface RootState {
  user: UserState;
  bill: BillState;
}

const store = configureStore({
  reducer: combineReducers<RootState>({
    user: UserReducer,
    bill: BillReducer,
  }),
  middleware: [thunk],
});

export { store };
