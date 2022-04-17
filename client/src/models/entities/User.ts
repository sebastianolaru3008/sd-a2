import { Order } from './Order';

export interface User {
    id: string;
    email: string;
    restaurants: any[];
    orders: Order[];
}
