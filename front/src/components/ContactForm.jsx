import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

function ContactForm() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between", // Align items in a row
        marginBottom: "20px",
        // Add styles for the container with blurry background
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
        backdropFilter: "blur(10px)", // Apply blur effect
        borderRadius: "10px", // Add border radius for rounded corners
        padding: "20px", // Add padding for content spacing
        border: "2px solid black", // Add black border
      }}
    >
      {/* Company details on the left */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Align company details to the left
          width: "45%", // Adjust the width as needed
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

      {/* Contact form fields on the right */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // Align form fields to the left
          width: "45%", // Adjust the width as needed
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          sx={{ width: "100%", marginBottom: "10px" }}
        />
        <TextField
          label="Email"
          variant="outlined"
          sx={{ width: "100%", marginBottom: "10px" }}
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          sx={{ width: "100%", marginBottom: "10px" }}
        />
        <Button variant="contained" sx={{ width: "100%", marginTop: "10px" }}>
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default ContactForm;
