const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/primerosimpactos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conexión exitosa a MongoDB');
  mongoose.connection.close();
})
.catch(err => {
  console.error('Error de conexión:', err);
});
