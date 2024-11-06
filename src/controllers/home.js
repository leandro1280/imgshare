const ctrl = {};
const Image = require('../models/image'); 
// En controllers/home.js o donde realices la consulta
ctrl.index = async (req, res) => {
    try {
        const images = await Image.find().sort({ timestamp: -1 }).lean(); // Agrega .lean()
     
        res.render('index', { images });
    } catch (error) {
        console.error('Error al obtener imágenes:', error);
        res.status(500).send('Error al obtener imágenes');
    }
};

module.exports = ctrl;