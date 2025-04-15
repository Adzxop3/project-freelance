import React, { useState } from 'react'
import axios from 'axios'
import '../App.css'

function PostOffer() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [tags, setTags] = useState('')
  const [msg, setMsg] = useState('')

  const handlePost = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/jobs`, {
        title,
        description,
        budget,
        tags: tags.split(',').map(tag => tag.trim())
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setMsg('Offre publiée avec succès')
    } catch (err) {
      setMsg('Erreur lors de la publication de l\'offre')
    }
  }

  return (
    <div className="container">
      <h2>Publier une offre</h2>
      {msg && <div className="message error">{msg}</div>}
      <form onSubmit={handlePost}>
        <label>Titre :</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        <label>Description :</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        <label>Budget :</label>
        <input type="number" value={budget} onChange={e => setBudget(e.target.value)} required />
        <label>Tags (séparés par des virgules) :</label>
        <input type="text" value={tags} onChange={e => setTags(e.target.value)} required />
        <button type="submit">Publier</button>
      </form>
    </div>
  )
}

export default PostOffer
