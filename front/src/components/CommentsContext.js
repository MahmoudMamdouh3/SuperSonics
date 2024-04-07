// CommentsContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context to manage comments
const CommentsContext = createContext();

// Create a custom hook to access the comments context
export const useComments = () => useContext(CommentsContext);

// Context Provider component
export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const updateComments = (newComments) => {
    setComments(newComments);
  };

  return (
    <CommentsContext.Provider value={{ comments, updateComments }}>
      {children}
    </CommentsContext.Provider>
  );
};
