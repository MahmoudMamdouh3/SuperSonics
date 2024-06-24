import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios"; // Import Axios

function ContactForm() {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend API endpoint
      const response = await axios.post("your_backend_api_endpoint", formData);
      console.log("Form submission successful!", response.data);
      // Optionally, you can reset the form data after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
        padding: "20px",
        border: "2px solid black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "45%",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "10px" }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          Company Name: SuperSonics
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          Address: 123 Main Street, City, Country
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          Telephone: 01003031210
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "20px" }}>
          Email: supersonics@gmail.com
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit} // Attach handleSubmit to form submission
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "45%",
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name} // Bind value to form state
          onChange={handleInputChange} // Attach handleInputChange to input change
          sx={{ width: "100%", marginBottom: "10px", borderRadius: 8 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email} // Bind value to form state
          onChange={handleInputChange} // Attach handleInputChange to input change
          sx={{ width: "100%", marginBottom: "10px", borderRadius: 8 }}
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          name="message"
          value={formData.message} // Bind value to form state
          onChange={handleInputChange} // Attach handleInputChange to input change
          sx={{ width: "100%", marginBottom: "10px", borderRadius: 8 }}
        />
        <Button
          variant="contained"
          type="submit" // Specify button type as submit
          sx={{ width: "100%", marginTop: "10px", borderRadius: 8 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ContactForm;
