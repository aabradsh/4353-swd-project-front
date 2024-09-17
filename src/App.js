// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';  // Importing the Home component
import Login from './Pages/Login';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path= "/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
