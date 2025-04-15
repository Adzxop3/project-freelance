import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import './MySentApplications.css'

function MySentApplication() {
  const [applications, setApplications] = useState([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/applications/my-sent`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setApplications(res.data))
      .catch(err => setMsg('Error retrieving applications'))
  }, [])

  return (
    <div className="my-sent-container">
      <h2>Mes candidatures envoyées</h2>
      {msg && <p>{msg}</p>}
      {applications.length === 0 ? (
        <p>Aucune candidature envoyée pour le moment.</p>
      ) : (
        <ul className="my-sent-list">
          {applications.map(app => (
            <li key={app._id} className="my-sent-item">
              <div className="offer-info">
                <h3>{app.jobId?.title || 'Offre inconnue'}</h3>
                <p>ID du job: {app.jobId?._id?.toString().slice(-5) || '---'}</p>
              </div>
              <div className="application-info">
                <p>Statut: {app.status}</p>
                <p>Proposition: {app.price} €</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MySentApplication
