import { Food } from './Food';

export interface OrderedFood {
    id: string;
    food: Food;
    quantity: number;
}
