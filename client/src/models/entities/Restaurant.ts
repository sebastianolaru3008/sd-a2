import { Food } from "./Food";

export interface Restaurant{
  id: string;
  name: string;
  location: string;
  foods: Food[];
}