import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('freelancer');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        email,
        password,
        name,
        role
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (error) {
      setMsg("Erreur lors de l'inscription");
    }
  };

  return (
    <div className="auth-container">
      <h2>Inscription</h2>
      {msg && <div className="message error">{msg}</div>}
      <form onSubmit={handleSignup}>
        <label>Email :</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
        <label>Mot de passe :</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <label>Nom :</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required/>
        <label>Rôle :</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="freelancer">Freelancer</option>
          <option value="employer">Employeur</option>
        </select>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Signup;
