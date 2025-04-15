import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
function Home() {
  return (
    <div className="container">
      <h1>Bienvenue sur la plateforme Freelance</h1>
      <p>Découvrez nos fonctionnalités :</p>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/jobs" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontSize: '1.2rem' }}>
            Voir les offres d'emploi
          </Link>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/post-offer" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontSize: '1.2rem' }}>
            Publier une offre
          </Link>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/manage-applications" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontSize: '1.2rem' }}>
            Gérer les candidatures
          </Link>
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <Link to="/manage-contracts" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontSize: '1.2rem' }}>
            Gérer les contrats
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Home;
