// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Button, Container, Menu, MenuItem } from '@mui/material';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Navbar.css';


// function Navbar() {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [isAdmin, setAdminStatus] = useState([]);

//   // Connects back end to front end
//   useEffect(() => {
//     axios.get('http://localhost:4000/api/volunteerHistory/isAdmin', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`  // Assuming JWT authentication
//       }
//     })
//       .then(response => {
       
//         let isAdmin = response.data;
//         console.log(isAdmin);
//           return isAdmin;
//         });
//         setAdminStatus(isAdmin);
//       });

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <AppBar position="fixed" className="navbar">
//       <Toolbar>
//         <Container className="navbar-container" sx={{ paddingRight: '1rem' }}>
//           <Button className="navbar-button" component={Link} to="/">Home</Button>
//           <Button className="navbar-button" component={Link} to="/login">Login</Button>
//           <Button className="navbar-button" component={Link} to="/Register">Register Here</Button>
         

          
//           {/* Drop-down Menu */}
//           <Button className="navbar-button" onClick={handleMenuClick}>
//             More
//           </Button>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//           >
//             <MenuItem onClick={handleMenuClose} component={Link} to="/AdditionalInfo" className = "menu-item">PROFILE MANAGEMENT</MenuItem>
//             <MenuItem onClick={handleMenuClose} component={Link} to="/Notifications" className = "menu-item">NOTIFICATIONS</MenuItem>
//             <MenuItem onClick={handleMenuClose} component={Link} to="/VolunteerHistory" className = "menu-item">VOLUNTEER HISTORY</MenuItem>
//             <MenuItem onClick={handleMenuClose} component={Link} to="/EventManagement" className = "menu-item">EVENT MANAGEMENT</MenuItem>
//             <MenuItem onClick={handleMenuClose} component={Link} to="/VolunteerMatching" className = "menu-item">VOLUNTEER MATCHING</MenuItem>
//             <MenuItem onClick={handleMenuClose} component={Link} to="/Report" className = "menu-item">GENERATE REPORT</MenuItem>
//           </Menu>
//         </Container>
//       </Toolbar>
//     </AppBar>
//   );
// }

import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Container, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import './Navbar.css';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAdmin, setAdminStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // For programmatic navigation
  const location = useLocation(); // To track route changes

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLoggedIn(true);

      // Verify admin status with the backend
      axios
        .get('http://localhost:4000/api/volunteerHistory/isAdmin', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAdminStatus(response.data.isAdmin);
        })
        .catch(() => {
          setAdminStatus(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // This will rerun on location change (e.g., after login)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = async (credentials) => {
    try {
      // Perform login API request here
      const response = await axios.post('http://localhost:4000/api/login', credentials);

      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);

        // After successful login, update the login state and redirect
        setIsLoggedIn(true); // This triggers a re-render of the Navbar
        navigate('/AdditionalInfo'); // Redirect to the profile management (Additional Info) page
      } else {
        console.error('Login failed');
        // Handle login failure (show an error message, etc.)
      }
    } catch (error) {
      console.error('Login request failed', error);
    }
  };

  return (
    <AppBar position="fixed" className="navbar">
      <Toolbar>
        <Container className="navbar-container" sx={{ paddingRight: '1rem' }}>
          <Button className="navbar-button" component={Link} to="/">Home</Button>
          {!isLoggedIn && (
            <>
              <Button className="navbar-button" component={Link} to="/login" onClick={() => handleLogin({ username: 'user', password: 'password' })}>Login</Button>
              <Button className="navbar-button" component={Link} to="/Register">Register Here</Button>
            </>
          )}
          {isLoggedIn && (
            <>
              <Button className="navbar-button" component={Link} to="/profile">Profile</Button>
              {isAdmin && (
                <Button className="navbar-button" component={Link} to="/admin">Admin Panel</Button>
              )}
              <Button
                className="navbar-button"
                onClick={() => {
                  localStorage.removeItem('token');
                  setIsLoggedIn(false);
                  setAdminStatus(false);
                  navigate('/');  // Redirect to home page after logout
                }}
              >
                Logout
              </Button>
            </>
          )}

          {/* Drop-down Menu */}
          {isLoggedIn && (
            <Button className="navbar-button" onClick={handleMenuClick}>
              More
            </Button>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/AdditionalInfo" className="menu-item">PROFILE MANAGEMENT</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/Notifications" className="menu-item">NOTIFICATIONS</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/VolunteerHistory" className="menu-item">VOLUNTEER HISTORY</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/EventManagement" className="menu-item">EVENT MANAGEMENT</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/VolunteerMatching" className="menu-item">VOLUNTEER MATCHING</MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/Report" className="menu-item">GENERATE REPORT</MenuItem>
          </Menu>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
