// VideoUploadWithSubtitles.jsx

import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";

function VideoUploadWithSubtitles() {
  const [videoFile, setVideoFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [processedVideoUrl, setProcessedVideoUrl] = useState("");
  const baseUrl = "http://127.0.0.1:8080"; // Update to match your Django backend URL

  const validateInputs = () => {
    const errors = {};
    if (!videoFile) {
      errors.videoFile = "A video file is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleVideoChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append("video_file", videoFile);

    setProcessing(true);
    try {
      const response = await axios.post(`${baseUrl}/upload-video-with-subtitles/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Processed Video URL:", response.data.processed_video_url); // Log the URL
      setProcessedVideoUrl(response.data.processed_video_url);
      setProcessing(false);
    } catch (error) {
      console.error("Error uploading video:", error.response?.data || error.message);
      setProcessing(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Video Upload with Subtitles
        </Typography>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            style={{ marginBottom: "1rem" }}
          />
          {errors.videoFile && (
            <Typography color="error" gutterBottom>
              {errors.videoFile}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" disabled={processing}>
            {processing ? "Processing..." : "Upload Video"}
          </Button>
        </form>
        {processing && <Typography>Processing...</Typography>}
        {processedVideoUrl && (
          <Box mt={2}>
            <Typography variant="h6">Processed Video:</Typography>
            <video width="100%" controls>
              <source src={processedVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default VideoUploadWithSubtitles;
