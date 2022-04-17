import { Box, Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FoodOrderItem } from '../../models/entities/FoodOrderItem';
import { Restaurant } from '../../models/entities/Restaurant';
import { User } from '../../models/entities/User';
import { placeOrder } from '../../stores/bill/actions';
import { addToCart, removeFromCart } from '../../stores/bill/slice';
import { RootState } from '../../stores/store';
import CartItem from './CartItem';

const cartItems = [
    {
        id: '1',
        name: 'Pizza Capricioasa',
        description: 'ham, dough, tomato sauce, mushrooms, corn',
        category: 'Pizza',
        price: '24.99',
    },
    {
        id: '2',
        name: 'Pizza Carbonara',
        description: 'ham, dough, tomato sauce, mushrooms, corn',
        category: 'Pizza',
        price: '14.99',
    },
];

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector<RootState, FoodOrderItem[]>(
        state => state.bill.cartItems,
    );
    const currentRestaurant = useSelector<RootState, Restaurant | null>(
        state => state.restaurants.currentRestaurant,
    );
    const user = useSelector<RootState, User>(state => state.user.user);

    return (
        <>
            <Box component="h2">Your Cart</Box>
            {cartItems.length === 0 ? (
                <Box component="p">No items in cart.</Box>
            ) : null}
            {cartItems.map(element => (
                <CartItem
                    key={element.item.id}
                    item={element.item}
                    quantity={element.quantity}
                    addToCart={() => dispatch(addToCart(element.item))}
                    removeFromCart={() =>
                        dispatch(removeFromCart(element.item.id))
                    }
                />
            ))}
            <Box mt={2} component="h3">
                Total{' '}
                {cartItems.reduce(
                    (acc, element) =>
                        acc + element.item.price * element.quantity,
                    0,
                )}{' '}
                RON
            </Box>
            <Button
                variant="contained"
                style={{ textTransform: 'none' }}
                onClick={() => {
                    dispatch(
                        placeOrder(
                            user?.id,
                            cartItems,
                            currentRestaurant?.id ?? '',
                        ),
                    );
                }}
            >
                Place order
            </Button>
        </>
    );
};

export default Cart;
