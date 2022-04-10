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
} from "@mui/material";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

const deliveryZones = ["1", "2", "3"];

const RestaurantModal = (props: Props) => {
  const [deliveryZone, setDeliveryZone] = React.useState(deliveryZones[0]);
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

        <TextField sx={{ marginBottom: 2 }} label="Name" variant="outlined" />
        <TextField
          sx={{ marginBottom: 2 }}
          label="Location"
          variant="outlined"
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
        <Button
          sx={{ marginTop: 2, textTransform: "none" }}
          variant="contained"
          color="primary"
          onClick={() => props.onSubmit()}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default RestaurantModal;
