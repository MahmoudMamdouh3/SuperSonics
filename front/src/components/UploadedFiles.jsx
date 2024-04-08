import React, { useState } from "react";
import "../styles/styles.css";

function UploadedFiles() {
  // Sample data for uploaded files
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      fileName: "SampleAudioFile.mp3",
      likes: 10,
      shares: 5,
      downloads: 15,
    },
    {
      id: 2,
      fileName: "AnotherFile.mid",
      likes: 5,
      shares: 2,
      downloads: 8,
    },
  ]);

  // Function to handle downloading a file
  const handleDownload = (id) => {
    // Logic to handle file download
    console.log(`Downloading file with id ${id}`);
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
