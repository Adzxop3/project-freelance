import React from 'react';
import { Navigate } from 'react-router-dom';
export function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}
export function NoAuth({ children }) {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : children;
}
