import { OrderDto } from '../models/dto/OrderDto';
import { Order } from '../models/entities/Order';
import { axiosPostRequest } from './api/axios';

export const placeOrderRequest = (data: OrderDto) =>
    axiosPostRequest<OrderDto, Order>('/order', '', data);
