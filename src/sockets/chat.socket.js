const jwt = require('jsonwebtoken');

function initChatSocket(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token; 
    if (!token) {
      return next(new Error('No token'));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; 
      next();
    } catch (err) {
      return next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected, userId:', socket.user.userId);

    socket.on('message:send', (payload) => {
      io.emit('message:receive', {
        senderId: socket.user.userId,
        content: payload.content,
        timestamp: new Date()
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

module.exports = { initChatSocket };
