import AddIcon from "@mui/icons-material/Add";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  FormControl, InputLabel, Select,
  SelectChangeEvent
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentTable from "../../../components/ContentTable/ContentTable";
import FoodModal from "../../../components/FoodModal/FoodModal";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import RestaurantModal from "../../../components/RestaurantModal/RestaurantModal";
import { Restaurant } from "../../../models/entities/Restaurant";
import { categories } from "../../../models/enums/FoodCategory";
import { changeOrderStatus } from "../../../stores/restaurants/actions";
import { setCurrentRestaurant } from "../../../stores/restaurants/slice";
import { RootState } from "../../../stores/store";


const orderStatuses = [
  "PENDING",
  "ACCEPTED",
  "DECLINED",
  "IN_DELIVERY",
  "DELIVERED",
];

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = React.useState(categories[0]);
  const [orderStatus, setOrderStatus] = React.useState(orderStatuses[0]);
  const [restaurantModal, setRestaurantModal] = React.useState(false);
  const [foodModal, setFoodModal] = React.useState(false);
  const [tab, setTab] = React.useState("1");


  const restaurants = useSelector<RootState,Restaurant[]>(state=>state.user.user.restaurants);
  const currentRestaurant = useSelector<RootState,Restaurant|null>(state=>state.restaurants.currentRestaurant);

  useEffect(() => {
    dispatch(setCurrentRestaurant(restaurants[0]));
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
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Restaurant"
            onChange={(event: SelectChangeEvent) =>
              setCategory(event.target.value)
            }
          >
            {categories.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton onClick={() => setFoodModal(true)}>
          <AddIcon/>        
        </IconButton>

        <FoodModal
          isOpen={foodModal}
          onClose={handleClose}
        />

        <ContentTable
          header={
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          }
          body={!!currentRestaurant?.foods &&  currentRestaurant.foods.filter(food => food.category === category).map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        />
      </Box>
    );
  };

  const renderStatusOptions = (orderStatus:string) => {
    switch (orderStatus) {
      case "PENDING":
        return ([
          <MenuItem value={orderStatuses[0]}>{orderStatuses[0]}</MenuItem>,
          <MenuItem value={orderStatuses[1]}>{orderStatuses[1]}</MenuItem>,
          <MenuItem value={orderStatuses[2]}>{orderStatuses[2]}</MenuItem>,
        ])
      case "ACCEPTED":
        return ([
          <MenuItem value={orderStatuses[1]}>{orderStatuses[1]}</MenuItem>,
          <MenuItem value={orderStatuses[3]}>{orderStatuses[3]}</MenuItem>,
        ])
      case "DECLINED":
        return ([
          <MenuItem value={orderStatuses[2]}>{orderStatuses[2]}</MenuItem>
        ])
      case "IN_DELIVERY":
        return ([
          <MenuItem value={orderStatuses[3]}>{orderStatuses[3]}</MenuItem>,
          <MenuItem value={orderStatuses[4]}>{orderStatuses[4]}</MenuItem>,
        ])
      case "DELIVERED":
        return ([
          <MenuItem value={orderStatuses[4]}>{orderStatuses[4]}</MenuItem>,
        ])
      default:
        return []
    }
  }

  const renderAdminOrders = () => {
    return (
      <Box>
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            value={orderStatus}
            label="Restaurant"
            onChange={(event: SelectChangeEvent) =>
              setOrderStatus(event.target.value)
            }
          >
            {orderStatuses.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <ContentTable
          header={
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          }
          body={!!currentRestaurant?.foods && currentRestaurant?.orders.filter(order => order.orderStatus === orderStatus).map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.orderedFoods.map(element => `${element.quantity}x${element.food.name} `).join()}</TableCell>
              <TableCell align="right">{row.orderedFoods.reduce((acc, element) => acc+(element.food.price*element.quantity),0)}</TableCell>
              <TableCell align="right">
                <Select
                  defaultValue={row.orderStatus}
                  value={row.orderStatus}
                  onChange={(event, newValue) => {
                    dispatch(changeOrderStatus(row.id,event.target.value));
                  }}
                >
                  {renderStatusOptions(row.orderStatus)}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        />
      </Box>
    );
  };

  return (
    <>
      <HeaderBar />
      <Box mt={4}>
        <FormControl>
          <InputLabel>Restaurant</InputLabel>
          <Select
            value={currentRestaurant?.name ?? ''}
            label="Restaurant"
            sx={{ minWidth: 300 }}
            onChange={(event) =>
              dispatch(setCurrentRestaurant(restaurants.find((restaurant) => restaurant.name === event.target.value) as Restaurant))
            }
          >
            {restaurants.map((item) => (
              <MenuItem value={item.name}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <IconButton onClick={() => setRestaurantModal(true)}>
          <AddIcon/>
        </IconButton>

        <RestaurantModal
          isOpen={restaurantModal}
          onClose={() => setRestaurantModal(false)}
        />

        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Menu" value="1" />
              <Tab label="Orders" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">{renderAdminMenu()}</TabPanel>
          <TabPanel value="2">{renderAdminOrders()}</TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
export default AdminDashboard;
