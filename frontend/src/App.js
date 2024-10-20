import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { createAppTheme } from "./theme";
import Register from "./components/Register";
import Login from "./components/Login";
import ChatInterface from "./components/ChatInterface";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [darkMode, setDarkMode] = useState(false);
  const theme = createAppTheme(darkMode);

  useEffect(() => {
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("You have been logged out successfully.");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Router>
          <Navbar
            user={user}
            handleLogout={handleLogout}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <Routes>
            <Route
              path="/login"
              element={<Login setToken={setToken} setUser={setUser} />}
            />
            <Route
              path="/register"
              element={<Register setToken={setToken} setUser={setUser} />}
            />
            <Route
              path="/"
              element={<ChatInterface token={token} user={user} />}
            />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
