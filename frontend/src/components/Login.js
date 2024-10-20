import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const response = await login(email, password);
      setToken(response.token);
      setUser(response.user);
      navigate("/");
    } catch (err) {
      console.error("Error logging in user", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={5}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
