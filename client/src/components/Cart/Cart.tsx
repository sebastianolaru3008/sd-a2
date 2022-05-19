import SendIcon from '@mui/icons-material/Send';
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
        <Box
            sx={{
                minWidth: '25vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
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
                {cartItems
                    .reduce(
                        (acc, element) =>
                            acc + element.item.price * element.quantity,
                        0,
                    )
                    .toFixed(2)}{' '}
                LEI
            </Box>
            <Button
                variant="contained"
                disabled={cartItems.length === 0}
                endIcon={<SendIcon />}
                onClick={() => {
                    if (currentRestaurant) {
                        dispatch(
                            placeOrder(
                                user?.id,
                                cartItems,
                                currentRestaurant?.id,
                                currentRestaurant?.adminEmail,
                                currentRestaurant?.name,
                            ),
                        );
                    }
                }}
            >
                Place order
            </Button>
        </Box>
    );
};

export default Cart;
