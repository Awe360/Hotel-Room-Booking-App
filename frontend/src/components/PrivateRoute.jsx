import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {

    if (role==='admin') {
      return <Navigate to="/login" />;
    }
    if (role && user.role !== role) {
      return <Navigate to="/home" />;
    }
  
    return children;
  };
  
export default PrivateRoute
