import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import './Home.css';  // Import the CSS file

function Home() {
  return (
    <div>
      {/* Image at the top */}
      <Box className="image-box" />

      <Container maxWidth="xl" className="container">
        <Typography variant="header1" className="header1">
          Take the next step.
        </Typography>
        <Typography variant="body1" className="mission">
          Our mission here at TechTask is to empower students in technology and computer science by connecting them with meaningful volunteer opportunities. We aim to bridge the gap between education and real-world experience, offering a platform for students to apply their skills in service to the community. Through volunteerism, networking, and professional development, we strive to foster growth, collaboration, and innovation, helping students build the foundation for successful careers while making a positive impact.
        </Typography>
      </Container>
    </div>
  );
}

export default Home;