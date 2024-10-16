// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import AdditionalInfo from './Pages/AdditionalInfo'; // redirect to this page
import Navbar from './Navbar';
import Register from './Pages/Register';
import VolunteerMatching from './Pages/VolunteerMatching';
import Notifications from './Pages/Notifications';
import VolunteerHistory from './Pages/VolunteerHistory';
import EventManagement from './Pages/EventManagement';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> 

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/additional-info" element={<AdditionalInfo />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/volunteer-matching" element={<VolunteerMatching />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/volunteer-history" element={<VolunteerHistory />} />
          <Route path="/event-management" element={<EventManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
