import React from "react";
import { Box, Avatar, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import ScrollToBottom from "react-scroll-to-bottom";

// Styled components
const StyledMessage = styled(Box)(({ theme, sender }) => ({
  display: "flex",
  marginBottom: theme.spacing(2),
  alignItems: "flex-start",
  animation: "fadeIn 0.5s ease-out",
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(10px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme, sender }) => ({
  backgroundColor:
    sender === "user"
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
  marginRight: theme.spacing(2),
}));

const StyledTypography = styled(Typography)(({ theme, sender }) => ({
  backgroundColor:
    sender === "user"
      ? theme.palette.primary.light
      : theme.palette.secondary.light,
  color:
    sender === "user"
      ? theme.palette.primary.dark
      : theme.palette.secondary.dark,
  padding: theme.spacing(2),
  borderRadius: "12px",
  maxWidth: "75%",
  boxShadow: theme.shadows[1],
}));

function ChatMessages({ chat, isLoading }) {
  return (
    <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2, mt: 4 }}>
      <ScrollToBottom
        className="chatbox"
        style={{ flexGrow: 1, overflowY: "auto", marginBottom: "20px" }}
      >
        {chat.map((entry, index) => (
          <StyledMessage key={index} sender={entry.sender}>
            <StyledAvatar sender={entry.sender}>
              {entry.sender === "user" ? "U" : "AI"}
            </StyledAvatar>
            <Box>
              <StyledTypography variant="body1" sender={entry.sender}>
                {entry.text}
              </StyledTypography>
              {entry.action && <Box mt={1}>{entry.action}</Box>}
            </Box>
          </StyledMessage>
        ))}
        {isLoading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}
      </ScrollToBottom>
    </Box>
  );
}

export default ChatMessages;
