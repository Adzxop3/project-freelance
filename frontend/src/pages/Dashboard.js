import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Bienvenue, {user.name}</h2>
      <p>Vous êtes connecté.</p>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

export default Dashboard;
