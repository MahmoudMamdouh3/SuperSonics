import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import "../styles/styles.css";

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
        <Box
          className="nav-items"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ py: 0, display: "flex", alignItems: "center" }}
          >
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
            <div>
              <Typography
                className="nav-item"
                aria-controls="upload-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                sx={{
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "small",
                  color: "gray",
                }} // Apply the same font family as other nav items
              >
                Upload
              </Typography>
              <Menu
                id="upload-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link className="nav-item" to="/upload/Audio">
                    Audio
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link className="nav-item" to="/upload/Video">
                    Video
                  </Link>
                </MenuItem>
              </Menu>
            </div>
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
