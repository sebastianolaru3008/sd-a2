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
  Typography
} from "@mui/material";
import Alert from '@mui/material/Alert';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { addRestaurant } from "../../stores/user/actions";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const deliveryZones = ["1", "2", "3"];

const RestaurantModal = (props: Props) => {
  const dispatch =  useDispatch();
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState("");
  const [deliveryZone, setDeliveryZone] = React.useState(deliveryZones[0]);
  const adminId = useSelector<RootState, string>(state => state.user.user.id);
  const isInputError = useSelector<RootState, boolean>(state => state.user.isInputError);
  return (
    <Modal
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={props.isOpen}
      onClose={props.onClose}
    >
      <Box
        sx={{
          maxWidth: 200,
          backgroundColor: "white",
          borderRadius: 2 / 1,
          padding: 4,
        }}
      >
        <Typography sx={{ marginBottom: 2 }} variant="h6" component="h2">
          Add a restaurant
        </Typography>

        <TextField 
          sx={{ marginBottom: 2 }} 
          label="Name" 
          variant="outlined" 
          value = {name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
        />
        <TextField
          sx={{ marginBottom: 2 }}
          label="Location"
          variant="outlined"
          value = {location}
          onChange = {(event: React.ChangeEvent<HTMLInputElement>) => 
            setLocation(event.target.value)
          }
        />
        <FormControl sx={{ display: "flex" }}>
          <InputLabel>Delivery Zone</InputLabel>
          <Select
            value={deliveryZone}
            label="Delivery Zone"
            onChange={(event: SelectChangeEvent) =>
              setDeliveryZone(event.target.value)
            }
          >
            {deliveryZones.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </FormControl>
        {isInputError && <Alert severity="error">Invalid input data. Please check it again!</Alert>}
        <Button
          sx={{ marginTop: 2, textTransform: "none" }}
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(addRestaurant(name, location, adminId));
            if(!isInputError) {
              props.onClose();
            }
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default RestaurantModal;
