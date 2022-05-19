import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categories } from '../../models/enums/FoodCategory';
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
    const [price, setPrice] = React.useState('');
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
                    bgcolor: 'background.paper',
                    borderRadius: 2 / 1,
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography
                    sx={{ marginBottom: 2, width: '45vw' }}
                    variant="h3"
                    component="h2"
                >
                    Add an item
                </Typography>

                <TextField
                    sx={{ marginBottom: 2 }}
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setName(event.target.value)
                    }
                />
                <TextField
                    sx={{ marginBottom: 2 }}
                    multiline
                    label="Description"
                    rows={4}
                    variant="outlined"
                    value={description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setDescription(event.target.value)
                    }
                />
                {/* <TextField
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
                /> */}
                <FormControl>
                    <InputLabel>Category</InputLabel>
                    <Select
                        sx={{ marginBottom: 2 }}
                        value={category}
                        label="Category"
                        onChange={(event: SelectChangeEvent) =>
                            setCategory(event.target.value)
                        }
                    >
                        {categories.map(item => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    sx={{ marginBottom: 2 }}
                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        if (Number(event.target.value))
                            setPrice(event.target.value);
                    }}
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
                                Number(price),
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
