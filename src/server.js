require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
const socketIo = require('socket.io');
const applicationRoutes = require('./routes/application.routes')
const paymentRoutes = require('./routes/payment.routes')

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes)
app.use('/payments', paymentRoutes)
app.use('/contracts', express.static('public/contracts'))
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("No token provided"));
  next();
});

io.on('connection', (socket) => {
  console.log("User connected: " + socket.id);
  socket.on('message:send', (data) => {
    io.emit('message:receive', { senderId: socket.id, content: data.content, timestamp: new Date() });
  });
  socket.on('disconnect', () => {
    console.log("User disconnected: " + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
