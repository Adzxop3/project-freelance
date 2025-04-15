const router = require('express').Router()
const { verifyToken, checkRole } = require('../middlewares/auth.middleware')
const { createPaymentIntent } = require('../controllers/payment.controller')

router.post('/', verifyToken, checkRole(['employer']), createPaymentIntent)

module.exports = router