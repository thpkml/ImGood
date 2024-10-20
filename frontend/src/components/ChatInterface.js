import React, { useState, useEffect } from "react";
import {
  fetchChat,
  getConversations,
  getConversation,
  updateConversation,
  deleteConversation,
} from "../api";
import {
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const DRAWER_WIDTH = 350;

function ChatInterface({ darkMode, setDarkMode, token, user }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const fetchedConversations = await getConversations();
      setConversations(fetchedConversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      setError("Failed to fetch conversations");
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setChat([...chat, { sender: "user", text: message }]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetchChat(message, currentConversation?._id);
      setChat((prevChat) => [
        ...prevChat,
        { sender: "bot", text: response.message },
      ]);
      if (response.conversationId && !currentConversation) {
        setCurrentConversation({
          _id: response.conversationId,
          topic: response.topic,
        });
        setConversations((prev) => [
          { _id: response.conversationId, topic: response.topic },
          ...prev,
        ]);
      }
    } catch (error) {
      console.error("Error fetching chat:", error);
      setError("An error occurred while sending the message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectConversation = async (conversation) => {
    try {
      const fullConversation = await getConversation(conversation._id);
      setCurrentConversation(fullConversation);
      setChat(fullConversation.messages);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      setError("Failed to load conversation");
    }
  };

  const handleNewConversation = () => {
    setCurrentConversation(null);
    setChat([]);
  };

  const handleUpdateTopic = async (conversationId, newTopic) => {
    try {
      const updatedConversation = await updateConversation(
        conversationId,
        newTopic
      );
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === conversationId ? { ...conv, topic: newTopic } : conv
        )
      );
      if (currentConversation?._id === conversationId) {
        setCurrentConversation({ ...currentConversation, topic: newTopic });
      }
    } catch (error) {
      console.error("Error updating topic:", error);
      setError("Failed to update topic");
    }
  };

  const handleDeleteConversation = async (conversationId, event) => {
    // Stop the event from bubbling up to the ListItem
    event.stopPropagation();

    // Show a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this conversation?"
    );

    if (isConfirmed) {
      try {
        await deleteConversation(conversationId);
        setConversations((prevConversations) =>
          prevConversations.filter((conv) => conv._id !== conversationId)
        );
        if (currentConversation?._id === conversationId) {
          setCurrentConversation(null);
          setChat([]);
        }
      } catch (error) {
        console.error("Error deleting conversation:", error);
        setError("Failed to delete conversation");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)", // Subtract navbar height
        backgroundColor: "background.default",
        overflow: "hidden", // Prevent scrolling on the main container
      }}
    >
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              height: "calc(100% - 64px)",
              top: 64,
            },
          }}
        >
          <List>
            <ListItem>
              <Button startIcon={<AddIcon />} onClick={handleNewConversation}>
                New Conversation
              </Button>
            </ListItem>
            {conversations.map((conversation) => (
              <ListItem
                key={conversation._id}
                button
                onClick={() => handleSelectConversation(conversation)}
              >
                <ListItemText primary={conversation.topic} />
                <IconButton
                  onClick={() =>
                    handleUpdateTopic(
                      conversation._id,
                      prompt("Enter new topic")
                    )
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={(event) =>
                    handleDeleteConversation(conversation._id, event)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Container
          maxWidth="lg"
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column", py: 2 }}
        >
          <ChatMessages chat={chat} isLoading={isLoading} />
          <ChatInput
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </Container>
      </Box>
    </Box>
  );
}

export default ChatInterface;
