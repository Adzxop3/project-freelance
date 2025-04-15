import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (error) {
      setMsg("Erreur de connexion");
    }
  };

  return (
    <div className="auth-container">
      <h2>Connexion</h2>
      {msg && <div className="message error">{msg}</div>}
      <form onSubmit={handleLogin}>
        <label>Email :</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
        <label>Mot de passe :</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
