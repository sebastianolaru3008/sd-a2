import AddIcon from "@mui/icons-material/Add";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Autocomplete, Drawer,
  FormControl, InputLabel, Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Tab from "@mui/material/Tab";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cart from "../../../components/Cart/Cart";
import ContentTable from "../../../components/ContentTable/ContentTable";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import { FoodOrderItem } from "../../../models/entities/FoodOrderItem";
import { Restaurant } from "../../../models/entities/Restaurant";
import { User } from "../../../models/entities/User";
import { categories } from "../../../models/enums/FoodCategory";
import { addToCart } from "../../../stores/bill/slice";
import { setCurrentRestaurant } from "../../../stores/restaurants/slice";
import { RootState } from "../../../stores/store";


const CustomerDashboard = () => {
  const [category, setCategory] = React.useState(categories[0]);
  const [cartDrawer, setCartDrawer] = React.useState(false);
  const [tab, setTab] = React.useState("1");

  const dispatch = useDispatch();
  const user = useSelector<RootState,User>(state => state.user.user);
  const restaurants = useSelector<RootState,Restaurant[]>(state=>state.restaurants.restaurants);
  const currentRestaurant = useSelector<RootState,Restaurant|null>(state=>state.restaurants.currentRestaurant);
  const cartItems = useSelector<RootState, FoodOrderItem[]>(state => state.bill.cartItems);


  if("restaurants" in user){
    return <Navigate to="/admin-dashboard"/>
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const renderCustomerMenu = () => {
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

        <ContentTable
          header={
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          }
          body={currentRestaurant?.foods.filter(food => food.category === category).map((food) => (
            <TableRow
              key={food.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {food.name}
              </TableCell>
              <TableCell align="right">{food.description}</TableCell>
              <TableCell align="right">{food.category}</TableCell>
              <TableCell align="right">{food.price}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    dispatch(addToCart(food));
                  }}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        />
      </Box>
    );
  };
  const renderCustomerOrders = () => {
    return (
      <Box>
        <ContentTable
          header={
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          }
          body={user.orders.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.orderedFoods.map(element => `${element.quantity}x${element.food.name} `).join()}</TableCell>
              <TableCell align="right">{row.orderedFoods.reduce((acc, element) => acc+(element.food.price*element.quantity),0)}</TableCell>
              <TableCell align="right">{row.orderStatus}</TableCell>
            </TableRow>
          ))}
        />
      </Box>
    );
  };

  return (
    <>
      <HeaderBar
        isCustomer
        badgeCount={cartItems.reduce((acc,elem) => acc + elem.quantity, 0)}
        onClickShoppingCart={() => setCartDrawer(true)}
      />

      <Drawer
        anchor="right"
        open={cartDrawer}
        onClose={() => setCartDrawer(false)}
      >
        <Cart />
      </Drawer>

      <Box mt={4}>
        <Autocomplete
          disablePortal
          options={restaurants.map(restaurant=>restaurant.name)}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Restaurant" />}
          value = {currentRestaurant?.name}
          onChange={(_,newValue) => {
            dispatch(setCurrentRestaurant(restaurants.find((restaurant) => restaurant.name === newValue) as Restaurant));
          }}
        />

        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Menu" value="1" />
              <Tab label="Orders" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">{renderCustomerMenu()}</TabPanel>
          <TabPanel value="2">{renderCustomerOrders()}</TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
export default CustomerDashboard;
