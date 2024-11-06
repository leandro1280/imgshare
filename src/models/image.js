// models/image.js

const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const imageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

imageSchema.virtual('uniqueId').get(function () {
    if (this.filename) {
        return this.filename.replace(path.extname(this.filename), '');
    }
    return '';
});

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
