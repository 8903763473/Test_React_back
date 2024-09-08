const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String, // To store the base64 image string
        required: true,
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
