import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        <Container className="navbar-container">
          <Button className="navbar-button" component={Link} to="/">Home</Button>
          <Button className="navbar-button" component={Link} to="/login">Login</Button>
          <Button className="navbar-button" component={Link} to="/Register">Register Here</Button>
          <Button className="navbar-button" component={Link} to="/AdditionalInfo">Additional Info</Button>
          <Button className="navbar-button" component={Link} to="/volunteerMatching">Volunteer Matching</Button>
          <Button className="navbar-button" component={Link} to="/Notifications">Notifications</Button>
          <Button className="navbar-button" component={Link} to="/VolunteerHistory">Volunteer History</Button>
          <Button className="navbar-button" component={Link} to="/EventManagement">Event Management</Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
