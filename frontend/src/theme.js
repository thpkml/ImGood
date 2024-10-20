import { createTheme } from "@mui/material";

export const createAppTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#f5f5f5",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
      primary: {
        main: darkMode ? "#a0ddff" : "#1976d2",
        light: darkMode ? "#1b2533" : "#e3f2fd",
      },
      secondary: {
        main: darkMode ? "#a7fdaa" : "#4caf50",
        light: darkMode ? "#1e2c1e" : "#e8f5e9",
      },
    },
    typography: {
      fontSize: 16,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s, color 0.3s",
          },
        },
      },
    },
  });
