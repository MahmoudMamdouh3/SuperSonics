import React from "react";
import { Typography, Box, Avatar } from "@mui/material";
import "../styles/styles.css";

function FeedbackCard({ comment, name, jobTitle, imageUrl }) {
  return (
    <Box className="feedback-card">
      <Avatar
        src={imageUrl}
        alt={name}
        sx={{ width: 64, height: 64, marginBottom: 2 }}
      />
      <Typography variant="body1" gutterBottom>
        {comment}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        {name}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
        {jobTitle}
      </Typography>
    </Box>
  );
}

export default FeedbackCard;
