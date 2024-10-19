import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';  

function Login() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:4000/api/login', { email, password });
      setSuccessMessage(response.data.message);

      localStorage.setItem("token", response.data.token);
      console.log('User logged in:', response.data.user); 

      // redirect after login
      navigate('/additional-info');

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.error);
      } 
      
      else {
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
              className="login-input" 
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              className="login-input"  
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button 
              className="login-button"  
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
