import React from "react";
import { Typography, Box } from "@mui/material";
import UploadedFiles from "./UploadedFiles"; // Import the UploadedFiles component

function Home() {
  return (
    <Box
      sx={{
        height: "100vh", // Set height to 100vh
        display: "flex",
        flexDirection: "column",
        justifyContent: "top",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Rubik",
          fontSize: "4rem",
          color: "lightblack",
          marginBottom: "20px",
        }}
      >
        Welcome To SuperSonics
      </Typography>
      {/* Render the UploadedFiles component */}
      <UploadedFiles />
    </Box>
  );
}

export default Home;
