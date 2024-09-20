// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';  // Importing the Home component
import Login from './Pages/Login';
import AdditionalInfo from './Pages/AdditionalInfo';
import Navbar from './Navbar';
import Register from './Pages/Register'
import VolunteerMatching from './Pages/volunteerMatching'
import Notifications from './Pages/Notifications';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> 

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AdditionalInfo" element={<AdditionalInfo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/VolunteerMatching" element={<VolunteerMatching />} />
          <Route path="/Notifications" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;