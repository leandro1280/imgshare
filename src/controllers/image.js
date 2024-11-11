const ctrl = {};
const path = require('path');
const { randomNumber } = require('../helpers/libs'); // Asegúrate de que randomNumber está implementado en helpers/libs
const fs = require('fs-extra');
const Image = require('../models/image'); // Corregir la importación

// Mostrar la página principal con las imágenes almacenadas
ctrl.index = async (req, res) => {
    try {
        const images = await Image.find().sort({ timestamp: -1 }); // Ordenar por la más reciente
        res.render('index', { images });
    } catch (error) {
        console.error('Error al obtener imágenes:', error);
        res.status(500).send('Error al obtener imágenes');
    }
};

ctrl.getOne = async (req, res) => {
    try {
        const { imageId } = req.params;
        let image = await Image.findOne({ filename: imageId }).sort({ timestamp: -1 }).lean();
        console.log(image);
        
        res.render('oneImg', { image: image });
    } catch (error) {
        console.error('Error al obtener imágenes:', error);
        res.status(500).send('Error al obtener imágenes');
    }
};
// Crear una nueva imagen y redirigir al main después de guardarla
ctrl.create = async (req, res) => {
    try {
        const imgUrl = randomNumber(); // Si falta la implementación de randomNumber, se debe corregir
        const imageTempPath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            await fs.rename(imageTempPath, targetPath);
            const newImg = new Image({
                title: req.body.title,
                filename: imgUrl + ext,
                description: req.body.description
            });
            await newImg.save();

            // Redirigir a la página principal después de subir la imagen
            res.redirect('/');
        } else {
            await fs.unlink(imageTempPath);
            res.status(400).json({ error: 'Only images are allowed' });
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Implementar funcionalidad de "like"
ctrl.like = (req, res) => {
    // Implementar funcionalidad de like
};

// Implementar funcionalidad de comentarios
ctrl.comments = (req, res) => {
    // Implementar funcionalidad de comentarios
};

// Implementar funcionalidad de eliminación de imágenes
ctrl.remove = (req, res) => {
    // Implementar funcionalidad de eliminación de imágenes
};

module.exports = ctrl;
