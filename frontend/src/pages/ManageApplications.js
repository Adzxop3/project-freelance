import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function ManageApplications() {
  const [apps, setApps] = useState([])
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const fetchApplications = () => {
    const token = localStorage.getItem('token')
    axios.get(`${process.env.REACT_APP_API_URL}/applications/my`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      console.log("Applications retrieved:", res.data)
      setApps(res.data)
    })
    .catch(err => {
      console.error("Error retrieving applications:", err.response ? err.response.data : err.message)
      setMsg('Error retrieving applications: ' + (err.response ? err.response.data.message : err.message))
    })
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleAccept = async (appId) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/applications/${appId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Application accepted. Contract URL: ' + res.data.contractUrl)
      fetchApplications()
    } catch (err) {
      console.error("Error accepting application:", err.response ? err.response.data : err.message)
      alert('Error accepting application')
    }
  }

  const handleReject = async (appId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`${process.env.REACT_APP_API_URL}/applications/${appId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Application rejected')
      fetchApplications()
    } catch (err) {
      console.error("Error rejecting application:", err.response ? err.response.data : err.message)
      alert('Error rejecting application')
    }
  }

  const handlePay = (appId) => {
    navigate(`/payment/${appId}`)
  }

  return (
    <div className="container">
      <h2>Mes candidatures reçues</h2>
      {msg && <p>{msg}</p>}
      {apps.length === 0 ? (
        <p>Aucune candidature pour le moment</p>
      ) : (
        <ul>
          {apps.map(a => (
            <li key={a._id}>
              <p>Offre: {a.jobId?.title || 'Non renseigné'}</p>
              <p>Candidat: {a.freelancerId?.email || 'Non renseigné'}</p>
              <p>Statut: {a.status}</p>
              <p>Proposition: {a.price} €</p>
              {a.status === 'pending' && (
                <>
                  <button onClick={() => handleAccept(a._id)}>Accepter</button>
                  <button onClick={() => handleReject(a._id)}>Refuser</button>
                </>
              )}
              {a.status === 'accepted' && (
                <button onClick={() => handlePay(a._id)}>Payer</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ManageApplications

