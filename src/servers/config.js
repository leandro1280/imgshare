const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes/index');
const errorHandler = require('errorhandler');

module.exports = app => {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));

    app.engine('.hbs', exphbs.engine({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers'),
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    }));
    app.set('view engine', '.hbs');

    // Middlewares
    app.use(morgan('dev'));
    app.use(multer({ dest: path.join(__dirname, '../public/upload/temp') }).single('image'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Rutas
    routes(app);

    // Archivos estáticos
    app.use ("/", express.static(path.resolve(__dirname, "../public")));




    // Error handler
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    return app;
};