const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, required: true },
            quantity: { type: Number, required: true, min: 1 },
            productName: { type: String, required: true },
            productCategory: { type: String, required: true },
            productImage: { type: String, required: false },
            productOriginalRate: { type: Number, required: true },
            productCurrentRate: { type: Number, required: true },
            productDescription: { type: String, required: true },
            productRating: { type: Number, default: 0 },
            productStatus: { type: String, enum: ['Available', 'Out of Stock'], default: 'Available' },
            productQuantity: { type: Number, required: true },
            productUnit: { type: String, required: true },
            productDiscount: { type: Number, default: 0 },
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
