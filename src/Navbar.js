import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#ea00d9' }}>
      <Toolbar>
        <Container>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/GetInvolved">Get Involved</Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
