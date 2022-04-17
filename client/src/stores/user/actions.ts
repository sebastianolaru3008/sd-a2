import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { FoodDto } from "../../models/dto/FoodDto";
import { RestaurantDto } from "../../models/dto/RestaurantDto";
import { addFoodRequest, addRestaurantRequest, getRestaurantsRequest } from "../../services/RestaurantsService";
import { loginRequest, signupRequest } from "../../services/UserService";
import { setCurrentRestaurant, setRestaurants } from "../restaurants/slice";
import { restaurantsInitialState } from "../restaurants/state";
import { RootState } from "../store";
import { addFoodToRestaurant, addRestaurantToUser, login, logout, setIsInputError } from "./slice";


export const loginUser = (email: string, password: string) : ThunkAction < void, RootState, null, AnyAction> => 
async (dispatch) =>{
    try{
        const loginResponse = await loginRequest(email, password);
        dispatch(login(loginResponse));

        const getRestaurantsResponse = await getRestaurantsRequest();

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

export const addRestaurant = (name: string, location:string, adminId:string, onClose: () => void ) : ThunkAction < void, RootState, null, AnyAction> => 
async (dispatch) =>{
    try{
        const data = {  name: name, location: location, adminId: adminId } as RestaurantDto;
        const response = await addRestaurantRequest(data);

        dispatch(addRestaurantToUser(response));
        dispatch(setIsInputError(false));
        onClose();
    }catch(error){
        dispatch(setIsInputError(true));
        console.log("Error:", error);
    }
}

export const addFood = (name:string, description:string, category:string, price:number, restaurantId:string, onClose: () => void ) : ThunkAction < void, RootState, null, AnyAction> => 
async (dispatch) =>{
    try{
      console.log("🚀 ~ file: actions.ts ~ line 66 ~ restaurantId", restaurantId)
        const data = {  name: name, description: description, category: category, price: price, restaurantId: restaurantId } as FoodDto;
        const response = await addFoodRequest(data);

        dispatch(addFoodToRestaurant({food:response, restaurantId: restaurantId}));
        dispatch(setIsInputError(false));
        onClose();
    }catch(error){
        console.log("Error:", error);
        dispatch(setIsInputError(true));
    }
}


