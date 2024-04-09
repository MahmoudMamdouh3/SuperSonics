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
            color: "white",
            textDecoration: "underline",
            fontSize: "0.8rem",
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
