// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';  // Importing the Home component
import Login from './Pages/Login';
import GetInvolved from './Pages/GetInvolved';
import Navbar from './Navbar';


function App() {
  return (
    <Router>
      <div>
        <Navbar /> 

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/getinvolved" element={<GetInvolved />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;