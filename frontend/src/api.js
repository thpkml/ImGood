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

export const fetchChat = async (message, conversationId = null) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  try {
    const response = await axios.post(
      `${API_URL}/chat`,
      { message, conversationId },
      { headers: { "x-auth-token": token } }
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetchChat:", error.response || error);
    throw error;
  }
};

export const getConversations = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/chat/conversations`, {
    headers: { "x-auth-token": token },
  });
  return response.data;
};

export const getConversation = async (conversationId) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `${API_URL}/chat/conversations/${conversationId}`,
    {
      headers: { "x-auth-token": token },
    }
  );
  return response.data;
};

export const updateConversation = async (conversationId, topic) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${API_URL}/chat/conversations/${conversationId}`,
    { topic },
    { headers: { "x-auth-token": token } }
  );
  return response.data;
};

export const deleteConversation = async (conversationId) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/chat/conversations/${conversationId}`, {
    headers: { "x-auth-token": token },
  });
};
