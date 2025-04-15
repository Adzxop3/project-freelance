import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../App.css'
import './JobOffers.css'

function JobOffers() {
  const [offers, setOffers] = useState([])
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [detailError, setDetailError] = useState('')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/jobs`)
      .then(res => setOffers(res.data))
      .catch(err => console.error(err))

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUserRole(JSON.parse(storedUser).role)
    }
  }, [])

  const handleSelectOffer = (id) => {
    setSelectedOffer(null)
    setLoadingDetail(true)
    setDetailError('')
    axios.get(`${process.env.REACT_APP_API_URL}/jobs/${id}`)
      .then(res => {
        setSelectedOffer(res.data)
        setLoadingDetail(false)
      })
      .catch(err => {
        console.error(err)
        setDetailError('Erreur lors du chargement des détails')
        setLoadingDetail(false)
      })
  }

  return (
    <div className="indeed-container">
      <h2>Emplois recommandés</h2>
      <div className="indeed-content">
        <div className="indeed-left">
          {offers.map(o => (
            <div
              className="job-item"
              key={o._id}
              onClick={() => handleSelectOffer(o._id)}
            >
              <h3>{o.title}</h3>
              <p className="company">{o.employerId || 'Entreprise'}</p>
              <p className="snippet">{(o.description || '').slice(0, 50)}...</p>
              <p className="posted">Posté récemment</p>
            </div>
          ))}
          {offers.length === 0 && (
            <p>Aucune offre disponible pour le moment.</p>
          )}
        </div>

        <div className="indeed-right">
          {loadingDetail ? (
            <p>Chargement des détails...</p>
          ) : selectedOffer ? (
            <div className="detail-card">
              <h3>{selectedOffer.title}</h3>
              <p className="company">{selectedOffer.employerId || 'Entreprise'}</p>
              <p>{selectedOffer.description}</p>
              {selectedOffer.budget && <p>Budget : {selectedOffer.budget}</p>}
              {selectedOffer.tags && <p>Tags : {selectedOffer.tags.join(', ')}</p>}

              {userRole === 'freelancer' && (
                <Link to={`/jobs/${selectedOffer._id}/apply`}>
                  <button>Postuler</button>
                </Link>
              )}
            </div>
          ) : detailError ? (
            <p>{detailError}</p>
          ) : (
            <p className="no-selection">Sélectionnez une offre pour voir les détails</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobOffers
