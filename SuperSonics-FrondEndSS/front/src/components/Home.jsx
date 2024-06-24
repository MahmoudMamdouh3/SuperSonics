import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box } from '@mui/material';
import UploadedFiles from './UploadedFiles';

function Home() {
  const [fileNames, setFileNames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/files') // Replace with your API endpoint
      .then(response => {
        setFileNames(response.data.fileNames);  // Corrected line
      })
      .catch(error => {
        console.error('Error fetching file names:', error);
      });
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'Oswald',
          fontSize: '5rem',
          color: 'lightblack',
          marginBottom: '20px',
          letterSpacing: '6px',
        }}
      >
        Welcome To SuperSonics
      </Typography>
      <img
        src="../assets/music.gif"
        alt=""
        style={{ width: '500px', height: '400px' }}
        color="black"
      />
      <UploadedFiles />
      {fileNames.map((fileName, index) => (
        <Typography key={index}>Name:{fileName}</Typography>
      ))}
    </Box>
  );
}

export default Home;