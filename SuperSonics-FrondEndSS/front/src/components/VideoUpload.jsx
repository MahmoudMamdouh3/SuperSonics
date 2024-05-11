import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { Container, Typography, Button, Box } from "@mui/material";

function VideoUpload() {
  const [videoFile, setVideoFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    // Validate file type (optional)
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setErrors({});
    } else {
      setVideoFile(null);
      setErrors({ video: "Please select a valid video file." });
    }
  };

  const handleUpload = async () => {
    try {
      if (!videoFile) {
        setErrors({ video: "Please select a video file to upload." });
        return;
      }

      const formData = new FormData();
      formData.append("video", videoFile);

      const response = await axios.post("/api/upload-video", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", response.data);
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error("Error uploading video:", error);
      // Handle error (e.g., show error message)
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
        padding: "50px 0", // Add padding
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom align="center">
          Video Upload
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={{
              marginBottom: "1rem",
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }} // Custom file input style
          />
          {errors.video && (
            <Typography color="error" gutterBottom align="center">
              {errors.video}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            style={{ width: "100%", borderRadius: "5px" }} // Custom button style
          >
            Upload Video
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default VideoUpload;
