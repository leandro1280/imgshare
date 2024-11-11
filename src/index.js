const path = require("path");
const express = require('express');
const config = require('./servers/config'); // Ajustamos la ruta
require('./database');
const app =config(express());

config(app); // Aplica la configuración de puerto y otras configuraciones

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});
