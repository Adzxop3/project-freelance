import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import '../App.css'

function ApplyOffer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [coverLetter, setCoverLetter] = useState('')
  const [price, setPrice] = useState('')
  const [msg, setMsg] = useState('')

  const handleApply = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/jobs/${id}/apply`, { coverLetter, price }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      const applicationId = res.data.applicationId
      navigate(`/payment/${applicationId}`)
    } catch (err) {
      setMsg('Erreur lors de la candidature')
    }
  }

  return (
    <div className="auth-container">
      <h2>Postuler à l'offre</h2>
      {msg && <div className="message error">{msg}</div>}
      <form onSubmit={handleApply}>
        <label>Lettre de motivation :</label>
        <textarea value={coverLetter} onChange={e => setCoverLetter(e.target.value)} required />
        <label>Prix proposé :</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        <button type="submit">Postuler</button>
      </form>
    </div>
  )
}

export default ApplyOffer