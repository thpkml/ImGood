import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

export const fetchChat = async (message) => {
  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token); // Debugging line

  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }

  try {
    console.log("Sending request with token:", token); // Debugging line
    const response = await axios.post(
      `${API_URL}/chat`,
      { message },
      { headers: { "x-auth-token": token } }
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetchChat:", error.response || error); // More detailed error logging
    if (error.response && error.response.status === 401) {
      throw new Error("Your session has expired. Please log in again.");
    }
    throw error;
  }
};
