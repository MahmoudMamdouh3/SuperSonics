import React, { useState } from "react";

import {
  Box,
  Typography,
  Button,
  //MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar,
  Checkbox,
  //ListItemText,
  FormControl,
  //InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import axios from "axios"; // Import Axios

function AudioUpload() {
  const baseUrl = "http://127.0.0.1:8000";  // Update to match your server
  const [isUpscalingChecked, setUpscalingChecked] = useState(false);
  const [isRetrievalChecked, setRetrievalChecked] = useState(false);
  const [selectedAudioFile, setSelectedAudioFile] = useState(null);
  const [selectedMidiFile, setSelectedMidiFile] = useState(null);
  const [selectedGender, setSelectedGender] = useState("female"); // Default to female
  const [openArtistSelection, setOpenArtistSelection] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [artistCounts, setArtistCounts] = useState({
    "Amr Diab": 0,
    "Om Kalthoum": 0,
    "Sayed Darwish": 0,
    Abdelhalim: 0,
    Abdelwahab: 0,
    "Mickael Jackson": 0,
  });
  const [artistImages] = useState({
    "Amr Diab": "/assets/amrdiab.jpeg",
    "Om Kalthoum": "/assets/omkalthoum.jpeg",
    "Sayed Darwish": "/assets/sayeddarwish.jpeg",
    Abdelhalim: "/assets/abdelhalim.jpeg",
    Abdelwahab: "/assets/abdelwahab.jpeg",
    "Mickael Jackson": "/assets/jackson.jpeg",
  });

  const handleAudioFileChange = (event) => {
    setSelectedAudioFile(event.target.files[0]);
  };

  const handleMidiFileChange = (event) => {
    setSelectedMidiFile(event.target.files[0]);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('audio', selectedAudioFile);

    axios.post(`${baseUrl}/audio/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
      // Check if the "Upscaling" checkbox is checked
      const upscalingChecked = document.getElementById('upscaling-checkbox').checked;

      if (upscalingChecked) {
          console.log(response);
          let audioFileName = selectedAudioFile.name; // Get the name of the uploaded file
          
          axios.post(`${baseUrl}/run-python-script/`, { audioFileName: selectedAudioFile.name })
            .then(response => console.log(response.data.message))
            .catch(error => console.error(error.response.data.error));
      }
  });
};

  const handleOpenArtistSelection = () => {
    setOpenArtistSelection(true);
  };

  const handleCloseArtistSelection = () => {
    setOpenArtistSelection(false);
  };

  const handleSelectArtist = (artist) => {
    setSelectedArtist(artist);
    const updatedCounts = { ...artistCounts };
    updatedCounts[artist]++;
    setArtistCounts(updatedCounts);
    setOpenArtistSelection(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          margin: "auto",
          marginTop: 10,
          marginLeft: 35,
          padding: 2,
          "& > *": {
            marginBottom: 2,
          },
          borderRadius: 8,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom color="black">
          File Upload
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenArtistSelection}
            sx={{ borderRadius: 8, width: "100%" }} // Set border radius for the button and width to 100%
          >
            Select Your Artist
          </Button>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ width: 300, marginTop: 2 }}
          >
            Selected Artist: {selectedArtist}
          </Typography>
        </Box>
        <input
          type="file"
          accept="audio/*"
          onChange={handleAudioFileChange}
          style={{ display: "none" }}
          id="audio-file-input"
        />
        <Box sx={{ marginBottom: 2 }}>
          <label htmlFor="audio-file-input">
            <Button
              variant="contained"
              component="span"
              fullWidth
              sx={{ borderRadius: 8, width: 400 }} // Set border radius for the button
            >
              {selectedAudioFile ? "Audio File Selected" : "Select Audio File"}
            </Button>
          </label>
        </Box>
        <input
          type="file"
          accept=".mid,.midi"
          onChange={handleMidiFileChange}
          style={{ display: "none" }}
          id="midi-file-input"
        />
        <Box sx={{ marginBottom: 2 }}>
          <label htmlFor="midi-file-input">
            <Button
              variant="contained"
              component="span"
              fullWidth
              sx={{ borderRadius: 8 }} // Set border radius for the button
            >
              {selectedMidiFile ? "MIDI File Selected" : "Select MIDI File"}
            </Button>
          </label>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ marginTop: 2 }}
          >
            Choose Enhancements:
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", marginTop: 1 }}>
          <FormControlLabel control={<Checkbox id="upscaling-checkbox" checked={isUpscalingChecked} 
      onChange={(e) => setUpscalingChecked(e.target.checked)}/>} label="Upscaling" />

<FormControlLabel 
  control={
    <Checkbox 
      checked={isRetrievalChecked} 
      onChange={(e) => setRetrievalChecked(e.target.checked)}
    />
  } 
  label="Retrieval Voice Conversion" 
/>
          </Box>
        </Box>

        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="gender"
            name="gender"
            value={selectedGender}
            onChange={handleGenderChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUpload}
          disabled={!selectedAudioFile && !selectedMidiFile || (!isUpscalingChecked && !isRetrievalChecked)}



          sx={{ marginBottom: 2, borderRadius: 8 }} // Set border radius for the button
        >
          Upload
        </Button>
      </Box>
      <Box
        sx={{
          flex: 2,
          backgroundColor: "#f9f9f9",
          padding: 3,
          borderRadius: 8,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
        }}
      >
        {/* This box will contain the partition for enhanced audios */}
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          color="textPrimary"
        >
          Enhanced Audios
        </Typography>
        {/* Add your UI elements for displaying enhanced audios here */}
      </Box>

      <Dialog open={openArtistSelection} onClose={handleCloseArtistSelection}>
        <DialogTitle>Select Your Favorite Artist</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            {Object.keys(artistCounts).map((artist, index) => (
              <Grid item xs={4} key={index}>
                <Avatar
                  alt={artist}
                  src={artistImages[artist]}
                  sx={{ width: 150, height: 150, margin: "auto" }}
                />
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ marginTop: 1 }}
                >
                  {artist}
                </Typography>
                <Typography
                  variant="subtitle2"
                  align="center"
                >{`Selected: ${artistCounts[artist]} times`}</Typography>
                <Box sx={{ textAlign: "center", marginTop: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleSelectArtist(artist)}
                    sx={{ borderRadius: 8 }} // Set border radius for the button
                  >
                    Selected artist
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseArtistSelection} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AudioUpload;
