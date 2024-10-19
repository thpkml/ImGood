// src/api.js
import axios from "axios";

// Function to call the backend API
export const fetchChat = async (message) => {
  try {
    const response = await axios.post("http://localhost:5000/api/chat", {
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
    return null;
  }
};
