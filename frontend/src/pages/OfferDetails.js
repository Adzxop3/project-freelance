import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function OfferDetails() {
  const { id } = useParams()
  const [offer, setOffer] = useState(null)
  const [msg, setMsg] = useState('')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/jobs/${id}`)
      .then(res => setOffer(res.data))
      .catch(err => {
        console.error(err)
        setMsg('Erreur lors du chargement des détails')
      })
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUserRole(JSON.parse(storedUser).role)
    }
  }, [id])

  if (!offer) return <div className="container"><p>{msg || 'Chargement...'}</p></div>

  return (
    <div className="container">
      <h2>{offer.title}</h2>
      <p>{offer.description}</p>
      <p>Budget: {offer.budget}</p>
      {offer.tags && <p>Tags: {offer.tags.join(', ')}</p>}
      {userRole === 'freelancer' && (
        <Link to={`/jobs/${offer._id}/apply`}>
          <button>Postuler</button>
        </Link>
      )}
    </div>
  )
}

export default OfferDetails
