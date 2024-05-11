import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/styles.css";

function UploadedFiles() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fetch uploaded files from the backend when the component mounts
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  // Function to fetch uploaded files from the backend
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("/api/uploaded-files");
      setUploadedFiles(response.data);
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  // Function to handle downloading a file
  const handleDownload = async (id) => {
    try {
      // Send a request to the backend to download the file
      const response = await axios.get(`/api/download-file/${id}`, {
        responseType: "blob", // Set response type to blob for downloading files
      });
      // Create a blob URL and initiate download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        response.headers["content-disposition"].split("filename=")[1]
      );
      document.body.appendChild(link);
      link.click();
      // Clean up
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  // Function to handle sharing a file
  const handleShare = (id) => {
    // Logic to handle file sharing
    console.log(`Sharing file with id ${id}`);
  };

  // Function to handle liking a file
  const handleLike = (id) => {
    // Logic to handle file liking
    console.log(`Liking file with id ${id}`);
  };

  return (
    <div className="uploaded-files-container">
      <h2>Uploaded Files</h2>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.id} className="file-item">
            <div className="file-details">
              <span className="file-name">{file.fileName}</span>
              <div className="file-actions">
                <button
                  className="action-button"
                  onClick={() => handleDownload(file.id)}
                >
                  Download
                </button>
                <button
                  className="action-button"
                  onClick={() => handleShare(file.id)}
                >
                  Share
                </button>
                <button
                  className="action-button"
                  onClick={() => handleLike(file.id)}
                >
                  Like
                </button>
              </div>
            </div>
            <div className="file-stats">
              <span className="file-stat">Likes: {file.likes}</span>
              <span className="file-stat">Shares: {file.shares}</span>
              <span className="file-stat">Downloads: {file.downloads}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadedFiles;
