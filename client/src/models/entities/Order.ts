import { OrderedFood } from './OrderedFood';

export interface Order {
    id: string;
    orderStatus: string;
    orderedFoods: OrderedFood[];
}
