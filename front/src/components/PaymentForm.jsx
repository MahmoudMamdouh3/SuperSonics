import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import "../styles/styles.css";

function PaymentForm() {
  const [formData, setFormData] = useState({
    cardNumber: "#### - #### - #### - ####",
    expirationDate: "MM/YY",
    cvv: "",
    fullName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission, such as sending data to a backend server
    console.log("Form submitted with data:", formData);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h5" gutterBottom>
        Payment Information
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        maxWidth="400px"
        width="100%"
        padding="20px"
        boxShadow="0px 0px 10px 0px rgba(0,0,0,0.1)"
        borderRadius="8px"
        bgcolor="#fff"
      >
        <TextField
          fullWidth
          margin="normal"
          id="cardNumber"
          label="Card Number"
          name="cardNumber"
          variant="outlined"
          value={formData.cardNumber}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="expirationDate"
          label="Expiration Date"
          name="expirationDate"
          variant="outlined"
          value={formData.expirationDate}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="cvv"
          label="CVV"
          name="cvv"
          variant="outlined"
          value={formData.cvv}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          id="fullName"
          label="Full Name"
          name="fullName"
          variant="outlined"
          value={formData.fullName}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default PaymentForm;
