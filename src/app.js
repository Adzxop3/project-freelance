require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const paymentRoutes = require('./routes/payment.routes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>API Freelance</h1><p>Utilise Postman ou un client HTTP pour tester les endpoints.</p>');
});

app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);
app.use('/payments', paymentRoutes);

module.exports = app;
