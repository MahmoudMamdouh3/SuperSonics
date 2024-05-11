import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#000000",
        padding: "20px",
        textAlign: "center",
        height: "50px", // Increase the height of the footer
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/aboutus" style={{ textDecoration: "none" }}>
        <Button
          style={{
            color: "gray", // Adjust color to match the nav items
            textDecoration: "none", // Remove underline
            fontSize: "0.8rem",
            transition: "color 0.3s", // Add transition for color property
          }}
          sx={{
            "&:hover": {
              textDecoration: "none", // Remove underline on hover
              color: "#007bff !important", // Change color to blue on hover
            },
          }}
        >
          Contact Us
        </Button>
      </Link>
      <Typography variant="body2" color="white" textAlign="center">
        &copy; 2024 Your Company Name. All rights reserved.
      </Typography>
    </footer>
  );
}

export default Footer;
