import React, { useState } from "react";
import { fetchChat } from "../api";
import { Box, Container, Snackbar, Alert, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

function ChatInterface({ darkMode, setDarkMode, token, user }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setChat([...chat, { sender: "user", text: message }]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetchChat(message);
      setChat((prevChat) => [
        ...prevChat,
        { sender: "ai", text: response.message },
      ]);
    } catch (error) {
      console.error("Error fetching chat:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";
      let action = null;

      if (error.message === "No authentication token found. Please log in.") {
        errorMessage = "You need to log in to use the chat.";
        action = (
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/login")}
            sx={{ display: "block", mt: 1 }}
          >
            Click here to log in
          </Link>
        );
      } else if (error.response && error.response.status === 401) {
        errorMessage = "Your session has expired. Please log in again.";
        action = (
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/login")}
            sx={{ display: "block", mt: 1 }}
          >
            Click here to log in again
          </Link>
        );
      }

      setChat((prevChat) => [
        ...prevChat,
        {
          sender: "ai",
          text: "I'm sorry, I encountered an error. " + errorMessage,
          action: action,
        },
      ]);
      setError({ message: errorMessage, action });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(null);
  };

  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", height: "100%", py: 2 }}
    >
      <ChatHeader darkMode={darkMode} setDarkMode={setDarkMode} />
      <ChatMessages chat={chat} isLoading={isLoading} />
      <ChatInput
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
          action={error && error.action}
        >
          {error && error.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ChatInterface;
