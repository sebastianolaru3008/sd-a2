import { Order } from '../../models/entities/Order';
import { Restaurant } from '../../models/entities/Restaurant';
import { User } from '../../models/entities/User';

export interface UserState {
    isLoggedIn: boolean;
    isInputError: boolean;
    user: User;
}

export const userInitialState: UserState = {
    isLoggedIn: false,
    isInputError: false,
    user: {
        id: 'nimic',
        email: '',
        restaurants: [] as Restaurant[],
        orders: [] as Order[],
        admin: false,
    },
};
