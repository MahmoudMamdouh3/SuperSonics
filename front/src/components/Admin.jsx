import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Link,
} from "@mui/material";

function Admin() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Authenticate the admin using formData
    // For example, you can send the formData to your backend for authentication
    console.log("Form submitted with data:", formData);
    // Simulate successful authentication for demonstration
    localStorage.setItem("isAdminAuthenticated", true);
    setIsAdminLoggedIn(true);
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("isAdminAuthenticated");
    setIsAdminLoggedIn(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Check admin authentication when component mounts
  useState(() => {
    const isAdminAuthenticated = localStorage.getItem("isAdminAuthenticated");
    setIsAdminLoggedIn(!!isAdminAuthenticated);
  }, []);

  // If admin is not logged in, render the sign-in form
  if (!isAdminLoggedIn) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Admin Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="emailOrUsername"
              label="Email or Username"
              name="emailOrUsername"
              autoFocus
              value={formData.emailOrUsername}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    );
  } else {
    // If admin is logged in, render the admin dashboard
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Welcome Admin
          </Typography>
          {/* Add additional content for logged in admin */}
          <Link onClick={handleSignOut} href="/admin/signin">
            Return to Sign In
          </Link>
        </Box>
      </Container>
    );
  }
}

export default Admin;
