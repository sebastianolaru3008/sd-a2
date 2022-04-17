import { OrderedFoodDto } from './OrderedFoodDto';

export interface OrderDto {
    customerId: string;
    orderedFoods: OrderedFoodDto[];
    restaurantId: string;
}
