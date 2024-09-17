// src/Home.js
import React from 'react';
import { Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to My Simple Home Page</h1>
      <p>This is a basic home page built with React.</p>
      
      {/* Button to Navigate to Login Page */}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/login"
      >
        Go to Login
      </Button>
    </Container>
  );
}

export default Home;
