import { FoodDto } from '../models/dto/FoodDto';
import { RestaurantDto } from '../models/dto/RestaurantDto';
import { Food } from '../models/entities/Food';
import { Order } from '../models/entities/Order';
import { Restaurant } from '../models/entities/Restaurant';
import {
    axiosGetRequest,
    axiosPostRequest,
    axiosPutRequest,
} from './api/axios';

export const getRestaurantsRequest = () =>
    axiosGetRequest<Restaurant[]>('/restaurant', '');

export const addRestaurantRequest = (data: RestaurantDto) =>
    axiosPostRequest<RestaurantDto, Restaurant>('/restaurant', '', data);

export const addFoodRequest = (data: FoodDto) =>
    axiosPostRequest<FoodDto, Food>('/food', '', data);

export const changeOrderStatusRequest = (orderId: string, status: string) =>
    axiosPutRequest<string, Order>(`/order`, orderId, '', status);
