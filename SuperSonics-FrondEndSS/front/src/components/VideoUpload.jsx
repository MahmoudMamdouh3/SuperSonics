import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

function VideoUpload() {
  const [videoFile, setVideoFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    // Validate file type (optional)
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      setErrors({ video: "Please select a valid video file." });
    }
  };

  const handleUpload = () => {
    // Handle video upload logic
    if (videoFile) {
      console.log("Uploading video:", videoFile);
      // You can implement your upload logic here
    } else {
      setErrors({ video: "Please select a video file to upload." });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)", // Adjust height to match other pages
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Video Upload
        </Typography>
        <form>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={{ marginBottom: "1rem" }}
          />
          {errors.video && (
            <Typography color="error" gutterBottom>
              {errors.video}
            </Typography>
          )}
          <Button variant="contained" color="primary" onClick={handleUpload}>
            Upload Video
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default VideoUpload;
