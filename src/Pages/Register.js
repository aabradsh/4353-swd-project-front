import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import './Register.css';

function Register() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setLoading(true); // start loading
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // make call to api for register
      const registrationResponse = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const registrationData = await registrationResponse.json();

      if (registrationResponse.ok) {
        console.log('Registration successful', registrationData);

        const loginResponse = await fetch('http://localhost:4000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          console.log('Login successful after registration', loginData);

          // store token and user info
          localStorage.setItem('token', loginData.token);
          localStorage.setItem('userName', loginData.userName);
          localStorage.setItem('userId', loginData.userId); 

          navigate('/profile');
        } 
        
        else {
          setErrorMessage('Login failed after registration. Please try logging in manually.');
        }
      } 
      
      else {
        setErrorMessage(registrationData.message || 'Registration failed. Please try again.');
      }
    } 
    
    catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred. Please try again.');
    } 
    
    finally {
      setLoading(false); // stop loading
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
              label="Name" // new input for name
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              className="register-input"
            />
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
            <Button  
              type="submit"
              className="register-button"
              fullWidth
              disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
            </Button>
          </Box>

          <p>
            Already have an account?
          </p>
          <p>
            Login <Link to="/login">here</Link>!
          </p>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
