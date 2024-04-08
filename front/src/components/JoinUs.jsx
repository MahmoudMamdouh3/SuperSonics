import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Snackbar,
} from "@mui/material";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import "../styles/styles.css";

function JoinUS() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleToggleMode = () => {
    setIsSignUp((prevState) => !prevState);
    setErrors({});
  };

  const validateInputs = async () => {
    const errors = {};

    // Basic validation
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    if (isSignUp) {
      if (!email.trim()) {
        errors.email = "Email is required";
      }
      if (!dob.trim()) {
        errors.dob = "Date of birth is required";
      }
      if (password !== verifyPassword) {
        errors.verifyPassword = "Passwords do not match";
      }
    }

    // Check if username is already taken
    if (username.trim()) {
      try {
        const response = await axios.get(`/api/check-username/${username}`);
        if (response.data.exists) {
          errors.username = "Username is already taken";
        }
      } catch (error) {
        console.error("Error checking username availability:", error);
        // Handle error
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await axios.post("/api/signin", {
          username,
          password,
        });
        console.log("Sign-in successful:", response.data);
      } catch (error) {
        console.error("Sign-in error:", error.response.data);
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await axios.post("/api/signup", {
          username,
          email,
          dob,
          password,
        });
        console.log("Sign-up successful:", response.data);
        // Show success message
        setSuccessMessage("Account created successfully!");
      } catch (error) {
        console.error("Sign-up error:", error.response.data);
      }
    }
  };

  // Function to close success message
  const handleCloseSuccessMessage = () => {
    setSuccessMessage("");
  };

  return (
    <div>
      <Container
        maxWidth="sm"
        style={{
          marginLeft: "10%",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
          padding: "10px",
        }}
      >
        <div
          style={{
            backdropFilter: "blur(30px)", // Blurry background
            border: "1px solid #000", // Black border
            borderRadius: 8,
            padding: "10px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form
            style={{ width: "100%", marginTop: "5rem" }}
            noValidate
            autoComplete="off"
            onSubmit={isSignUp ? handleSignUp : handleSignIn}
          >
            {isSignUp && (
              <>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!errors.username}
                  helperText={errors.username}
                  size="small" // Added size attribute
                />
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  size="small" // Added size attribute
                />
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  size="small" // Added size attribute
                />
                <TextField
                  fullWidth
                  id="verifyPassword"
                  label="Verify Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  error={!!errors.verifyPassword}
                  helperText={errors.verifyPassword}
                  size="small" // Added size attribute
                />
                <TextField
                  fullWidth
                  id="dob"
                  label="Date of birth"
                  type="date"
                  variant="outlined"
                  margin="normal"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      transform: "none",
                      position: "static",
                      fontSize: "1rem",
                    },
                  }}
                  error={!!errors.dob}
                  helperText={errors.dob}
                  size="small" // Added size attribute
                />
              </>
            )}

            {!isSignUp && (
              <>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!!errors.username}
                  helperText={errors.username}
                  size="small" // Added size attribute
                />
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  size="small" // Added size attribute
                />
              </>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "1rem", fontSize: "0.8rem" }}
              type="submit"
              size="small" // Added size attribute
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            Or sign in with:
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            style={{ marginTop: "0.5rem" }}
          >
            <Grid item xs={6}>
              <GoogleLoginButton
                onClick={() => console.log("Google clicked")}
                style={{ fontSize: "0.8rem" }}
              />
            </Grid>
            <Grid item xs={6}>
              <FacebookLoginButton
                onClick={() => console.log("Facebook clicked")}
                style={{ fontSize: "0.8rem" }}
              />
            </Grid>
          </Grid>
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            <Link
              href="#"
              onClick={() => console.log("Forgot password clicked")}
            >
              Forgot password?
            </Link>
          </Typography>
          <Typography variant="body2" style={{ marginTop: "1rem" }}>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <Link href="#" onClick={handleToggleMode}>
              {isSignUp ? "Sign in" : "Sign up"}
            </Link>
          </Typography>
        </div>
      </Container>
      {/* Snackbar for success message */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000} // Automatically close after 6 seconds
        onClose={handleCloseSuccessMessage}
        message={successMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
}

export default JoinUS;
