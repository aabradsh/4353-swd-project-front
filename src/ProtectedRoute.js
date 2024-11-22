import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, restrictedToAdmins = false }) {
  const token = localStorage.getItem('token');
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin')); // Store admin status in localStorage

  // If the user is not logged in, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the page is restricted to admins and the user is not an admin, redirect to home
  if (restrictedToAdmins && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
