import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
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
    <Container maxWidth="sm" className="payment-form-container">
      <Typography variant="h5" className="payment-form-header">
        Payment Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="cardNumber"
          label="Card Number"
          name="cardNumber"
          variant="outlined"
          value={formData.cardNumber}
          onChange={handleInputChange}
          className="payment-form-input"
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
          className="payment-form-input"
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
          className="payment-form-input"
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
          className="payment-form-input"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="payment-form-submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default PaymentForm;
