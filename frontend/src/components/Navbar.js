import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import './Navbar.css'
function Navbar() {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <nav className="navbar">
      <div className="logo"><Link to="/">Mon Freelance</Link></div>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        {user ? (
          <>
            {user.role === 'freelancer' && (
              <li><Link to="/my-sent-applications">Mes candidatures envoyées</Link></li>
            )}
            {user.role === 'employer' && (
              <li><Link to="/manage-applications">Candidatures reçues</Link></li>
            )}
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/chat">Messagerie</Link></li>
            <li><span>Bienvenue, {user.name}</span></li>
            <li>
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </li>
            <li><button onClick={handleLogout}>Déconnexion</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/signup">Inscription</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}
export default Navbar
