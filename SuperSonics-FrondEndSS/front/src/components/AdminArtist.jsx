import React, { useState } from "react";
import { Avatar, Typography, Button, TextField } from "@mui/material";
import "../styles/styles.css";

function AdminArtist() {
  const [artists, setArtists] = useState([
    { id: 1, name: "Abdelhalim", imageSrc: "./assets/abdelhalim.jpeg" },
    { id: 2, name: "Om Kalthoum", imageSrc: "./assets/omkalthoum.jpeg" },
    { id: 3, name: "Amr Diab", imageSrc: "./assets/amrdiab.jpeg" },
    { id: 4, name: "Michael Jackson", imageSrc: "./assets/jackson.jpeg" },
    { id: 5, name: "Sayed Darwish", imageSrc: "./assets/sayeddarwish.jpeg" },
    { id: 6, name: "Abdelwahab", imageSrc: "./assets/abdelwahab.jpeg" },
    // Add more artists as needed
  ]);
  const [editMode, setEditMode] = useState(false);
  const [newArtistName, setNewArtistName] = useState("");
  const [newArtistImage, setNewArtistImage] = useState(null);

  const handleEditArtist = (index) => {
    setEditMode(index);
  };

  const handleSaveArtist = (index) => {
    setEditMode(false);
    // Update artist details in the artists array
    const updatedArtists = [...artists];
    updatedArtists[index].name = newArtistName;
    updatedArtists[index].imageSrc = URL.createObjectURL(newArtistImage);
    setArtists(updatedArtists);
  };

  const handleDeleteArtist = (index) => {
    const updatedArtists = artists.filter((_, idx) => idx !== index);
    setArtists(updatedArtists);
  };

  const handleAddArtist = () => {
    // Generate a unique ID for the new artist
    const newArtistId = artists.length + 1;
    // Add the new artist to the artists array
    setArtists([
      ...artists,
      {
        id: newArtistId,
        name: newArtistName,
        imageSrc: URL.createObjectURL(newArtistImage),
      },
    ]);
    // Clear the input fields
    setNewArtistName("");
    setNewArtistImage(null);
  };

  return (
    <div className="artist-table-container">
      <table className="artist-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist, index) => (
            <tr key={artist.id}>
              <td>{artist.id}</td>
              <td>
                {editMode === index ? (
                  <TextField
                    variant="outlined"
                    size="small"
                    value={newArtistName}
                    onChange={(e) => setNewArtistName(e.target.value)}
                  />
                ) : (
                  <Typography>{artist.name}</Typography>
                )}
              </td>
              <td>
                {editMode === index ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewArtistImage(e.target.files[0])}
                  />
                ) : (
                  <Avatar
                    alt={artist.name}
                    src={artist.imageSrc}
                    sx={{ width: 50, height: 50 }}
                  />
                )}
              </td>
              <td>
                {editMode === index ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveArtist(index)}
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditArtist(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteArtist(index)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-artist-container">
        <Button variant="contained" color="primary" onClick={handleAddArtist}>
          Add Artist
        </Button>
      </div>
    </div>
  );
}

export default AdminArtist;
/*
import React, { useState, useEffect } from "react";
import { Avatar, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import "../styles/styles.css";

function AdminArtist() {
  const [artists, setArtists] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [newArtistName, setNewArtistName] = useState("");
  const [newArtistImage, setNewArtistImage] = useState(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axios.get("/api/artists");
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const handleEditArtist = (index) => {
    setEditMode(index);
  };

  const handleSaveArtist = async (index) => {
    try {
      const updatedArtist = artists[index];
      await axios.put(`/api/artists/${updatedArtist.id}`, updatedArtist);
      setEditMode(null);
    } catch (error) {
      console.error("Error saving artist:", error);
    }
  };

  const handleDeleteArtist = async (index) => {
    try {
      const artistToDelete = artists[index];
      await axios.delete(`/api/artists/${artistToDelete.id}`);
      setArtists(artists.filter((artist) => artist.id !== artistToDelete.id));
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  };

  const handleAddArtist = async () => {
    try {
      const response = await axios.post("/api/artists", {
        name: newArtistName,
        imageSrc: newArtistImage,
      });
      setArtists([...artists, response.data]);
      setNewArtistName("");
      setNewArtistImage(null);
    } catch (error) {
      console.error("Error adding artist:", error);
    }
  };

  return (
    <div className="artist-table-container">
      <table className="artist-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist, index) => (
            <tr key={artist.id}>
              <td>{artist.id}</td>
              <td>
                {editMode === index ? (
                  <TextField
                    variant="outlined"
                    size="small"
                    value={artists[index].name}
                    onChange={(e) => {
                      const updatedArtists = [...artists];
                      updatedArtists[index].name = e.target.value;
                      setArtists(updatedArtists);
                    }}
                  />
                ) : (
                  <Typography>{artist.name}</Typography>
                )}
              </td>
              <td>
                {editMode === index ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const updatedArtists = [...artists];
                      updatedArtists[index].imageSrc = e.target.files[0];
                      setArtists(updatedArtists);
                    }}
                  />
                ) : (
                  <Avatar
                    alt={artist.name}
                    src={artist.imageSrc}
                    sx={{ width: 50, height: 50 }}
                  />
                )}
              </td>
              <td>
                {editMode === index ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveArtist(index)}
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      onClick={() => handleEditArtist(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteArtist(index)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-artist-container">
        <Button variant="contained" color="primary" onClick={handleAddArtist}>
          Add Artist
        </Button>
      </div>
    </div>
  );
}

export default AdminArtist;*/
