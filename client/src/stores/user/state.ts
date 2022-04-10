import { User } from "../../models/entities/User";



export interface UserState {
  isLoggedIn: boolean;
  user: User;
}

export const userInitialState: UserState = {
  isLoggedIn: false,
  user : {
    id: "nimic",
    email: "",
    restaurants: [],
    orders: []
  }
};