import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { BillReducer } from './bill/slice';
import { BillState } from './bill/state';
import { RestaurantsReducer } from './restaurants/slice';
import { RestaurantsState } from './restaurants/state';
import { UserReducer } from './user/slice';
import { UserState } from './user/state';

export interface RootState {
    user: UserState;
    restaurants: RestaurantsState;
    bill: BillState;
}

const userPersistConfig = {
    key: 'user',
    storage,
};
const store = configureStore({
    reducer: combineReducers<RootState>({
        user: persistReducer(userPersistConfig, UserReducer as Reducer),
        restaurants: RestaurantsReducer,
        bill: BillReducer,
    }),
    middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
