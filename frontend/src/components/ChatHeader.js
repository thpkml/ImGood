import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const HeaderBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  position: "sticky",
  top: 0,
  zIndex: 1,
  backgroundColor: theme.palette.background.default,
  transition: "background-color 0.3s, color 0.3s",
}));

function ChatHeader() {
  return (
    <HeaderBox>
      {/* You can add any additional content here if needed */}
    </HeaderBox>
  );
}

export default ChatHeader;
