const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connecté à MongoDB');
  } catch (error) {
    console.error('Erreur de connexion MongoDB:', error);
    process.exit(1);
  }
}

module.exports = { connectDB };
