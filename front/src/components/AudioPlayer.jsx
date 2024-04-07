import React from "react";
import { Card, CardContent, IconButton, Box } from "@mui/material";
import { Share, ThumbUp } from "@mui/icons-material";

function AudioPlayer({ audioFiles }) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "10px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
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
                justifyContent: "center",
              }}
            >
              <IconButton sx={{ marginRight: "10px" }}>
                <Share />
              </IconButton>
              <IconButton>
                <ThumbUp />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default AudioPlayer;
