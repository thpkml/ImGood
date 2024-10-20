import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatInput({ message, setMessage, handleSendMessage, isLoading }) {
  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        backgroundColor: "background.default",
        pt: 2,
      }}
    >
      <TextField
        fullWidth
        multiline
        minRows={1}
        maxRows={4}
        variant="outlined"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) =>
          e.key === "Enter" && !e.shiftKey && handleSendMessage()
        }
        sx={{
          backgroundColor: "background.paper",
          borderRadius: "12px",
          transition: "background-color 0.3s, color 0.3s",
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            padding: "24px 56px 24px 24px",
            transition: "background-color 0.3s, color 0.3s",
          },
        }}
      />
      <IconButton
        onClick={handleSendMessage}
        disabled={isLoading}
        sx={{
          position: "absolute",
          right: "20px",
          top: "60%",
          transform: "translateY(-50%)",
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
          width: "40px",
          height: "40px",
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
}

export default ChatInput;
