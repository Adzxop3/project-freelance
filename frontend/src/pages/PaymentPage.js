import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import '../App.css'

const stripePromise = loadStripe('pk_test_51RC0WdGfOpFpcPNVQ7dlAYKYKptUf4icXxhJvGN1lPoIjkeF2aNhd9PO3hEuAHeT8T00xw0HqSVXv1nND3eiFlPR00YKvWekle')

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    })
    if (result.error) {
      setMessage(result.error.message)
    } else if (result.paymentIntent.status === 'succeeded') {
      setMessage('Paiement réussi !')
      setTimeout(() => { navigate('/dashboard') }, 2000)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Payer</button>
      {message && <div>{message}</div>}
    </form>
  )
}

function PaymentPage() {
  const { applicationId } = useParams()
  const [clientSecret, setClientSecret] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/payments`, {
      applicationId,
      amount: 100
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setClientSecret(res.data.clientSecret))
    .catch(err => {
      console.error(err)
      setErrorMsg('Erreur lors du chargement du paiement')
    })
  }, [applicationId])
  return (
    <div className="container">
      <h2>Paiement pour la candidature {applicationId}</h2>
      {errorMsg && <p>{errorMsg}</p>}
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <p>Chargement du paiement...</p>
      )}
    </div>
  )
}

export default PaymentPage
