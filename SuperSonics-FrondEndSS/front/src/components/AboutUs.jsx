import React, { useRef } from "react";
import { Typography, Box, Container } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import FeedbackCard from "./FeedbackCard";
import { IconButton } from "@mui/material";
import ContactForm from "./ContactForm"; // Import the ContactForm component

function AboutUs({ userComment }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200; // Adjust the scroll distance as needed
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200; // Adjust the scroll distance as needed
    }
  };

  return (
    <Container sx={{ maxWidth: "xl", padding: "0" }}>
      <Box
        sx={{
          marginTop: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "Rubik",
            fontSize: "6rem",
            color: "lightblack",
          }}
        ></Typography>
      </Box>

      {/* Add ContactForm above the feedback cards */}
      <ContactForm />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "16px",
        }}
      >
        <IconButton onClick={scrollLeft}>
          <KeyboardArrowLeft />
        </IconButton>
        <Box
          className="feedback-section"
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: "16px",
            padding: "16px",
            width: "100%",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "&:hover > *": {
              transition: "transform 0.5s ease",
            },
            "& > *:hover": {
              transform: "scale(1.08)", // Scale up when card is hovered
            },
          }}
        >
          <FeedbackCard
            comment={userComment} // Use the user's comment here
            name="Omar Zakzook"
            jobTitle="web designer"
            imageUrl="/assets/DSC00537.jpg"
          />
          <FeedbackCard
            comment={userComment} // Use the user's comment here
            name="Mahmoud mamdouh"
            jobTitle="Software Engineer"
            imageUrl="/assets/Screenshot 2024-03-02 at 15.25.28.png"
          />
          <FeedbackCard
            comment={userComment} // Use the user's comment here
            name="Maged Magdy"
            jobTitle="Software Engineer"
            imageUrl=""
          />
          <FeedbackCard
            comment={userComment} // Use the user's comment here
            name="Ahmed Abdelfattah"
            jobTitle="Product manager"
            imageUrl="/assets/Screenshot 2024-03-02 at 15.25.03.png"
          />
          {/* Add more FeedbackCard components with correct image URLs */}
        </Box>
        <IconButton onClick={scrollRight}>
          <KeyboardArrowRight />
        </IconButton>
      </Box>
    </Container>
  );
}

export default AboutUs;
