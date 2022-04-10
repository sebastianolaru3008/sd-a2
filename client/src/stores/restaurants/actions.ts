import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { getRestaurantsRequest } from "../../services/RestaurantsService";
import { RootState } from "../store";
import { setRestaurants } from "./slice";

export const getRestaurants = () : ThunkAction < void, RootState, null, AnyAction> => 
async (dispatch) =>{
    try{
        const response = await getRestaurantsRequest();
        console.log("🚀 ~ file: actions.ts ~ line 12 ~ response", response);
        // console.log("🚀 ~ file: actions.ts ~ line 12 ~ response", "orders" in response);
        

        dispatch(setRestaurants(response));
    }catch(error){
        console.log("Error:", error);
    }
}