import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stores/store';
import { addFood } from '../../stores/user/actions';

type Props = {
    isOpen: boolean;
    selectedCategory?: string;
    onClose: () => void;
};

const FoodModal = (props: Props) => {
    const dispatch = useDispatch();
    const restaurantId = useSelector<RootState, string>(
        state => state.restaurants.currentRestaurant?.id ?? '',
    );
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [category, setCategory] = React.useState('');
    const isInputError = useSelector<RootState, boolean>(
        state => state.user.isInputError,
    );

    return (
        <Modal
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            open={props.isOpen}
            onClose={props.onClose}
        >
            <Box
                sx={{
                    maxWidth: 200,
                    backgroundColor: 'white',
                    borderRadius: 2 / 1,
                    padding: 4,
                }}
            >
                <Typography
                    sx={{ marginBottom: 2 }}
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                >
                    Add an item
                </Typography>

                <TextField
                    sx={{ marginBottom: 2 }}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setName(event.target.value)
                    }
                />
                <TextField
                    sx={{ marginBottom: 2 }}
                    id="outlined-basic"
                    label="Description"
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setDescription(event.target.value)
                    }
                />
                <TextField
                    sx={{ marginBottom: 2 }}
                    id="outlined-basic"
                    label="Category"
                    rows={4}
                    defaultValue={props.selectedCategory}
                    variant="outlined"
                    value={category}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setCategory(event.target.value)
                    }
                />
                <TextField
                    sx={{ marginBottom: 2 }}
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setPrice(Number(event.target.value))
                    }
                />
                {isInputError && (
                    <Alert severity="error">
                        Invalid input data. Please check it again!
                    </Alert>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ textTransform: 'none' }}
                    onClick={() => {
                        dispatch(
                            addFood(
                                name,
                                description,
                                category,
                                price,
                                restaurantId,
                                props.onClose,
                            ),
                        );
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};

export default FoodModal;
