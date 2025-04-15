import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function ManageContracts() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/contracts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setContracts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Gérer les contrats</h2>
      {contracts.length === 0 ? (
        <p>Aucun contrat en cours.</p>
      ) : (
        <ul>
          {contracts.map(contract => (
            <li key={contract._id}>
              Contrat pour l'offre: {contract.jobId} – Statut: {contract.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageContracts;
