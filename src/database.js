const mongoose = require('mongoose');
const { database } = require('./keys');

mongoose.connect(database.URI, {
    serverSelectionTimeoutMS: 5000 // Opcional: Añade un tiempo máximo para evitar que tarde demasiado en conectarse
  })
  .then(() => console.log('DB is connected'))
  .catch(err => console.error('Error de conexión:', err));