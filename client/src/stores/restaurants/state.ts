import { Restaurant } from "../../models/entities/Restaurant";

export interface RestaurantsState {
  currentRestaurant: Restaurant | null;
  restaurants: Restaurant[];
}

export const restaurantsInitialState: RestaurantsState = {
  currentRestaurant: null,
  restaurants: [] as Restaurant[]
};