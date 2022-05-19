import { Food } from './Food';
import { Order } from './Order';

export interface Restaurant {
    id: string;
    name: string;
    adminEmail: string;
    location: string;
    foods: Food[];
    orders: Order[];
}
