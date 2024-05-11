import React from "react";
import { Card, CardContent, IconButton, Box, Button } from "@mui/material";
import { Share, ThumbUp } from "@mui/icons-material";

function AudioPlayer({ audioFiles }) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "10px",
        left: 0, // Align to the left edge of the screen
        width: "100%",
        display: "flex",
        flexDirection: "row", // Display horizontally
        alignItems: "center", // Center items horizontally
        zIndex: 999, // Ensure it's above other content
      }}
    >
      {audioFiles.map((audio, index) => (
        <Card
          key={index}
          sx={{
            maxWidth: 400,
            marginBottom: "20px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <a href={audio.url} download>
              {audio.name}
            </a>
            <Box
              sx={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "flex-start", // Align buttons to the left
              }}
            >
              {/* Separate buttons */}
              <Button
                variant="outlined"
                color="primary"
                sx={{ marginRight: "10px" }}
              >
                <Share />
              </Button>
              <Button variant="outlined" color="secondary">
                <ThumbUp />
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default AudioPlayer;
