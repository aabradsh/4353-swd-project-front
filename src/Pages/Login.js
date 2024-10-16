import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import axios from 'axios';
import './Login.css';  // Make sure to import your CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:4000/api/login', { email, password });
      setSuccessMessage(response.data.message); // Set success message

      // Here you can store the user's information (like token or user data) and redirect them
      console.log('User logged in:', response.data.user); // Example: you can store this in local storage or state management

      // Redirect or perform additional actions as needed

    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If the error is from the backend (invalid credentials)
        setErrorMessage(error.response.data.error);
      } else {
        // Other errors (e.g., network issues)
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <Container className="login-container" maxWidth="sm">
      <Paper className="login-paper" elevation={3}>
        <Typography className="login-title" variant="h4">LOGIN</Typography>
        {errorMessage && <Alert className="login-error" severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert className="login-success" severity="success">{successMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              className="login-input"  // Apply your custom CSS class
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              className="login-input"  // Apply your custom CSS class
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button 
              className="login-button"  // Apply your custom CSS class
              type="submit" 
              fullWidth 
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
