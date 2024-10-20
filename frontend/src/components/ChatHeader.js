import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// Styled components
const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: theme.palette.background.default,
  transition: "background-color 0.3s, color 0.3s",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
  transition: "background 0.3s, text-shadow 0.3s",
}));

const ModeToggle = styled(IconButton)(({ theme }) => ({
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "scale(1.1)",
  },
}));

function ChatHeader({ darkMode, setDarkMode }) {
  return (
    <HeaderBox>
      <Title variant="h4" component="h1">
        Mental Health Chat
      </Title>
      <ModeToggle onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </ModeToggle>
    </HeaderBox>
  );
}

export default ChatHeader;
