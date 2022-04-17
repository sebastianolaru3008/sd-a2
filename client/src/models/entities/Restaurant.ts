import { Food } from "./Food";
import { Order } from "./Order";

export interface Restaurant{
  id: string;
  name: string;
  location: string;
  foods: Food[];
  orders: Order[];
}