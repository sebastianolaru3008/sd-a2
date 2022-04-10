import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";

type Props = {
  isOpen: boolean;
  selectedCategory?: string;
  onClose: () => void;
  onSubmit: () => void;
};

const FoodModal = (props: Props) => {
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
        />
        <TextField
          sx={{ marginBottom: 2 }}
          id="outlined-basic"
          label="Description"
          rows={4}
          variant="outlined"
        />
        <TextField
          sx={{ marginBottom: 2 }}
          id="outlined-basic"
          label="Category"
          rows={4}
          defaultValue={props.selectedCategory}
          variant="outlined"
        />
        <TextField
          sx={{ marginBottom: 2 }}
          id="outlined-basic"
          label="Price"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
          onClick={() => props.onSubmit()}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default FoodModal;
