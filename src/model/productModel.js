const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    productCategory: { type: String, required: true }, // The category is stored as a string
    productImage: { type: String, required: false },
    productOriginalRate: { type: Number, required: true },
    productCurrentRate: { type: Number, required: true },
    productDescription: { type: String, required: true },
    productRating: { type: Number, default: 0 },
    productStatus: { type: String, enum: ['Available', 'Out of Stock'], default: 'Available' },
    productQuantity: { type: Number, required: true },
    productUnit: { type: String, required: true },
    productDiscount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
