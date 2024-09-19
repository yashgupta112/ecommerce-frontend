import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useUser(); // Get the current user from context

  // console.log("user: ", user);
  // If user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }
  // console.log('user : ', user);

  // If user role is not in the allowedRoles array, redirect to the Not Authorized page
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/not-authorized" />;
  }

  // If the user role matches, render the child components
  return children;
};

export default RoleProtectedRoute;
