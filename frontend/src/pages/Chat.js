import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import '../App.css'

let socket

function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    socket = io(process.env.REACT_APP_API_URL, {
      transports: ['websocket'],
      auth: { token: localStorage.getItem('token') }
    })
    socket.on('connect', () => {})
    socket.on('message:receive', (data) => {
      setMessages(prev => [...prev, data])
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('message:send', { content: input })
      setInput('')
    }
  }

  return (
    <div className="container">
      <h2>Messagerie</h2>
      <div style={{ border: '1px solid #ddd', height: '300px', overflowY: 'auto', padding: '10px', marginBottom: '1rem' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId || 'Moi'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Votre message..." 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          style={{ flex: 1, padding: '10px' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px 20px' }}>Envoyer</button>
      </div>
    </div>
  )
}

export default Chat
