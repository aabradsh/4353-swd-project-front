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
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setSuccessMessage('');
      return;
    }
    
    setErrorMessage('');

    try {
      // make API call to register
      const response = await axios.post('http://localhost:4000/api/register', { email, password });
      setSuccessMessage(response.data.message); // Set success message
      setErrorMessage(''); // Clear error message
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // if user already exists, show the error message
        setErrorMessage(error.response.data.error);
      } else {
        // handle other potential errors
        setErrorMessage('Something went wrong. Please try again.');
      }
      setSuccessMessage(''); // clear success message
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
