import { Restaurant } from "../models/entities/Restaurant";
import { axiosGetRequest } from "./api/axios";

export const getRestaurantsRequest = () => axiosGetRequest<Restaurant[]>("/restaurant","");
