import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { getRestaurantsRequest } from "../../services/RestaurantsService";
import { loginRequest, signupRequest } from "../../services/UserService";
import { setCurrentRestaurant, setRestaurants } from "../restaurants/slice";
import { restaurantsInitialState } from "../restaurants/state";
import { RootState } from "../store";
import { login, logout } from "./slice";


export const loginUser = (email: string, password: string) : ThunkAction < void, RootState, null, AnyAction> => 
async (dispatch) =>{
    try{
        const loginResponse = await loginRequest(email, password);
        console.log("🚀 ~ file: actions.ts ~ line 12 ~ response", loginResponse);
        // console.log("🚀 ~ file: actions.ts ~ line 12 ~ response", "orders" in response);
        dispatch(login(loginResponse));

        const getRestaurantsResponse = await getRestaurantsRequest();
        console.log("🚀 ~ file: actions.ts ~ line 19 ~ getRestaurantsResponse", getRestaurantsResponse)

        dispatch(setRestaurants(getRestaurantsResponse));
    }catch(error){
        console.log("Error:", error);
    }
}

export const signupUser = (email: string, password: string) : ThunkAction < void, RootState, null, AnyAction> => 
async (dispatch) =>{
    try{
        const response = await signupRequest(email, password);

        dispatch(login(response));

    }catch(error){
        console.log("Error:", error);
    }
}

export const logoutUser = () : ThunkAction < void, RootState, null, AnyAction> => 
async (dispatch) =>{
    try{
        dispatch(logout());
        dispatch(setRestaurants(restaurantsInitialState.restaurants));
        dispatch(setCurrentRestaurant(restaurantsInitialState.currentRestaurant));

    }catch(error){
        console.log("Error:", error);
    }
}



