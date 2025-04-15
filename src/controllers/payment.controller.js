const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.createPaymentIntent = async (req, res) => {
  try {
    const { applicationId, amount } = req.body
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      payment_method_types: ['card']
    })
    res.status(201).json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    res.status(500).json({ message: 'Error creating payment intent', error: err.message })
  }
}