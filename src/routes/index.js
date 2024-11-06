const express = require('express');
const home = require('../controllers/home');
const image = require('../controllers/image');
const router = express.Router();

module.exports = app => {
    router.get('/', home.index);
    router.get('/images/:image_id', image.index);
    router.post('/images', image.create);
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comments', image.comments);
    router.delete('/images/:image_id/comments', image.remove);

    app.use(router);
};
