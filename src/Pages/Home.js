// src/Home.js
import React from 'react';
import { Container } from '@mui/material';
//import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="lg" style={{ textAlign: 'left', marginTop: '50px' }}>
      <h1>Welcome to My Simple Home Page</h1>
      <p>Our mission here at TechTask is to empower students in technology and computer science by connecting them with meaningful volunteer opportunities. We aim to bridge the gap between education and real-world experience, offering a platform for students to apply their skills in service to the community. Through volunteerism, networking, and professional development, we strive to foster growth, collaboration, and innovation, helping students build the foundation for successful careers while making a positive impact.</p>
      

    </Container>
  );
}

export default Home;
