import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import "../styles/styles.css";

function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{ background: "black", padding: "auto", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1, // Adjust vertical padding here
        }}
      >
        <Typography
          className="nav-brand"
          variant="body3"
          component="div"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Link to="/">
            <img
              className="nav-logo"
              src="/assets/supersonics-high-resolution-logo-black-transparent.png"
              alt="Logo"
            />
          </Link>
        </Typography>
        <Box className="nav-items">
          <Typography variant="h6" component="div" sx={{ py: 0 }}>
            {""}
            {/* Adjust vertical padding here */}
            <Link className="nav-item" to="/profile">
              Profile
            </Link>
            <Link className="nav-item" to="/">
              Home
            </Link>
            <Link className="nav-item" to="/JoinUs">
              JoinUs
            </Link>
            <Link className="nav-item" to="/upload">
              Upload
            </Link>
            <Link className="nav-item" to="/UpgradePlan">
              UpgradePlan
            </Link>
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
