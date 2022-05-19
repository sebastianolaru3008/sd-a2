import AddIcon from '@mui/icons-material/Add';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import EditIcon from '@mui/icons-material/Edit';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContentTable from '../../../components/ContentTable/ContentTable';
import FoodModal from '../../../components/FoodModal/FoodModal';
import HeaderBar from '../../../components/HeaderBar/HeaderBar';
import RestaurantModal from '../../../components/RestaurantModal/RestaurantModal';
import { Restaurant } from '../../../models/entities/Restaurant';
import { changeOrderStatus } from '../../../stores/restaurants/actions';
import { setCurrentRestaurant } from '../../../stores/restaurants/slice';
import { RootState } from '../../../stores/store';
import generateFoodReport from '../../../utils/PdfHandler';

const orderStatuses = [
    'PENDING',
    'ACCEPTED',
    'DECLINED',
    'IN_DELIVERY',
    'DELIVERED',
];

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const [restaurantModal, setRestaurantModal] = React.useState(false);
    const [foodModal, setFoodModal] = React.useState(false);
    const [tab, setTab] = React.useState('1');

    const restaurants = useSelector<RootState, Restaurant[]>(
        state => state.user.user.restaurants,
    );
    const currentRestaurant = useSelector<RootState, Restaurant | null>(
        state => state.restaurants.currentRestaurant,
    );

    const navigate = useNavigate();

    const admin = useSelector<RootState, boolean>(
        state => state.user.user.admin,
    );

    useEffect(() => {
        if (!admin) {
            navigate('/dashboard');
        }
    }, [admin]);

    useEffect(() => {
        if (!!restaurants && restaurants.length) {
            dispatch(setCurrentRestaurant(restaurants[0]));
        }
    }, [restaurants]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleClose = () => {
        setRestaurantModal(false);
        setFoodModal(false);
    };

    const renderAdminMenu = () => {
        return (
            <Box>
                <Button
                    variant="text"
                    size="large"
                    endIcon={<AddIcon />}
                    onClick={() => setFoodModal(true)}
                >
                    <Typography py={1}>Add food</Typography>
                </Button>

                <FoodModal isOpen={foodModal} onClose={handleClose} />

                <ContentTable
                    header={
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    }
                    body={
                        !!currentRestaurant?.foods &&
                        currentRestaurant?.foods.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.description}
                                </TableCell>
                                <TableCell align="right">
                                    {row.category}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                            </TableRow>
                        ))
                    }
                />
            </Box>
        );
    };

    const renderStatusOptions = (orderStatus: string, orderId: string) => {
        switch (orderStatus) {
            case 'PENDING':
                return [
                    <Button
                        variant="contained"
                        endIcon={<ThumbUpIcon />}
                        color="success"
                        sx={{
                            mx: 1,
                        }}
                        onClick={() =>
                            dispatch(changeOrderStatus(orderId, 'ACCEPTED'))
                        }
                    >
                        Accept
                    </Button>,
                    <Button
                        variant="contained"
                        endIcon={<ThumbDownAltIcon />}
                        color="error"
                        sx={{
                            mx: 1,
                        }}
                        onClick={() =>
                            dispatch(changeOrderStatus(orderId, 'DECLINED'))
                        }
                    >
                        Decline
                    </Button>,
                ];
            case 'ACCEPTED':
                return [
                    <Button
                        variant="contained"
                        endIcon={<DeliveryDiningIcon />}
                        sx={{
                            mx: 1,
                        }}
                        onClick={() =>
                            dispatch(changeOrderStatus(orderId, 'IN_DELIVERY'))
                        }
                    >
                        Send
                    </Button>,
                ];
            case 'DECLINED':
                return [];
            case 'IN_DELIVERY':
                return [
                    <Button
                        variant="contained"
                        endIcon={<HowToRegIcon />}
                        sx={{
                            mx: 1,
                        }}
                        onClick={() =>
                            dispatch(changeOrderStatus(orderId, 'DELIVERED'))
                        }
                    >
                        Hand in
                    </Button>,
                ];
            default:
                return [];
        }
    };

    const renderAdminOrders = () => {
        return (
            <Box>
                <ContentTable
                    header={
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    }
                    body={
                        !!currentRestaurant?.orders &&
                        currentRestaurant?.orders.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">
                                    {row.orderedFoods
                                        .map(
                                            element =>
                                                `${element.quantity}x${element.food.name} `,
                                        )
                                        .join()}
                                </TableCell>
                                <TableCell align="right">
                                    {row.orderedFoods.reduce(
                                        (acc, element) =>
                                            acc +
                                            element.food.price *
                                                element.quantity,
                                        0,
                                    )}
                                </TableCell>
                                <TableCell align="right">
                                    {row.orderStatus}
                                </TableCell>
                                <TableCell align="right">
                                    {renderStatusOptions(
                                        row.orderStatus,
                                        row.id,
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                />
            </Box>
        );
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <HeaderBar />
            <Box
                sx={{
                    bgcolor: 'background.default',
                    flex: 1,
                    px: 3,
                }}
            >
                {!!currentRestaurant ? (
                    [
                        <Typography
                            p={2}
                            sx={{
                                fontSize: 48,
                                fontWeight: 'bold',
                                color: 'primary.main',
                            }}
                            variant="h1"
                        >
                            {currentRestaurant?.name}
                        </Typography>,
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                m: 2,
                                fontWeight: 'bold',
                            }}
                            endIcon={<EditIcon />}
                            onClick={() => {
                                if (
                                    !!currentRestaurant.foods &&
                                    !!currentRestaurant.name
                                ) {
                                    generateFoodReport(
                                        currentRestaurant.foods,
                                        currentRestaurant.name,
                                    );
                                }
                            }}
                        >
                            <Typography py={1}>Print products</Typography>
                        </Button>,
                    ]
                ) : (
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            m: 2,
                            fontWeight: 'bold',
                        }}
                        endIcon={<AddIcon />}
                        onClick={() => setRestaurantModal(true)}
                    >
                        <Typography py={1}>Add restaurant</Typography>
                    </Button>
                )}
                <RestaurantModal
                    isOpen={restaurantModal}
                    onClose={() => setRestaurantModal(false)}
                />

                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab label="Menu" value="1" />
                            <Tab label="Orders" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">{renderAdminMenu()}</TabPanel>
                    <TabPanel value="2">{renderAdminOrders()}</TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
};
export default AdminDashboard;
