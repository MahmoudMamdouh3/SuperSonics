import React, { useState } from "react";
import { TextField, Button, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewProfile() {
  const [userInfo, setUserInfo] = useState({
    email: "user@example.com",
    password: "password",
    dateOfBirth: "2000-01-01",
    comments: "Enter your comments here...",
    avatar: "/assets/user-avatar.png",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("YOUR_BACKEND_API_URL", userInfo);
      console.log("Response:", response.data);
      // Handle response data as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        avatar: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete("YOUR_DELETE_ENDPOINT");
      console.log("Account deleted:", response.data);
      // Handle success message or redirect the user
    } catch (error) {
      console.error("Error deleting account:", error);
      // Handle error
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        margin: "auto",
        marginTop: "2rem",
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(/assets/background.jpg)`, // Background image
        backgroundSize: "cover", // Cover the entire viewport
      }}
    >
      <Box
        sx={{
          padding: "20px",
          border: "2px solid #000", // Black border
          borderRadius: 8,
          backdropFilter: "blur(20px)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}
        >
          <Avatar
            src={userInfo.avatar}
            alt="User Avatar"
            sx={{ width: 100, height: 100 }}
          />
        </Box>

        {/* Profile picture change button */}
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange} // Attach handleAvatarChange to file input change
          style={{ display: "none" }}
          id="avatar-file-input"
        />
        <label htmlFor="avatar-file-input">
          <Button variant="contained" component="span" sx={{ borderRadius: 8 }}>
            Change Profile Picture
          </Button>
        </label>

        {/* Account information form */}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            margin="normal"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleInputChange}
            margin="normal"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={userInfo.dateOfBirth}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Comments"
            multiline
            rows={4}
            name="comments"
            value={userInfo.comments}
            onChange={handleInputChange}
            margin="normal"
            sx={{ marginBottom: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                fontSize: "0.8rem",
                padding: "6px 16px",
                borderRadius: 8,
              }}
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteAccount}
              sx={{
                fontSize: "0.8rem",
                padding: "6px 16px",
                borderRadius: 8,
              }}
            >
              Delete Account
            </Button>
          </Box>
        </form>

        {/* Text button to redirect to payment form */}
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Link to="/PaymentForm" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                width: "100%", // Make the button wide
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 2, // Add right padding for the arrow
                backgroundColor: "black", // Set background color to black
                color: "white", // Set text color to white
                fontSize: "0.8rem",
                padding: "6px 16px",
                borderRadius: 8,
              }}
            >
              Go to Payment Form
              <span style={{ marginLeft: "auto" }}>→</span> {/* Arrow symbol */}
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default ViewProfile;
