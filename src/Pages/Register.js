import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import axios from 'axios';
import './Register.css'; 

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setSuccessMessage('');
      return;
    }
  
    setErrorMessage('');  // Clear any previous error message
  
    try {
      // Make API call to register
      const response = await axios.post('http://localhost:4000/api/register', { email, password });
      setSuccessMessage(response.data.message); 
      setErrorMessage('');  
  
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          // Display all errors as a joined string
          setErrorMessage(error.response.data.errors.join('\n'));
        } 
        
        else if (error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } 
        
        else {
          setErrorMessage('Something went wrong. Please try again.');
        }
      } 
      
      else {
        setErrorMessage('Network error. Please check your connection.');
      }
  
      setSuccessMessage('');
    }
  };
  
  

  return (
    <Container maxWidth="sm" className="register-container">
      <Paper elevation={3} className="register-paper">
        <Typography variant="h4" className="register-title">
          REGISTER
        </Typography>
        {errorMessage && <Alert severity="error" className="register-error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success" className="register-success">{successMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              className="register-input"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              className="register-input"
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              className="register-input"
            />
            <Button className="register-button" type="submit" fullWidth>
              Register
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
