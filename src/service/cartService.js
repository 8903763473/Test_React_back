// services/cartService.js
const Cart = require('../model/cartModel');
const Product = require('../model/productModel');
const mongoose = require('mongoose');

class CartService {
    async getCart(userId) {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        return cart;
    }

    async addToCart(userId, productId, quantity) {
        try {
            let cart = await Cart.findOne({ userId }).populate('items.productId');

            if (cart) {
                const itemIndex = cart.items.findIndex(item => item.productId._id.toString() === productId.toString());

                if (itemIndex > -1) {
                    cart.items[itemIndex].quantity += quantity;
                } else {
                    const product = await Product.findById(productId);
                    if (!product) {
                        throw new Error('Product not found');
                    }
                    cart.items.push({
                        productId: product._id,
                        quantity,
                        productName: product.productName,
                        productCategory: product.productCategory,
                        productImage: product.productImage,
                        productOriginalRate: product.productOriginalRate,
                        productCurrentRate: product.productCurrentRate,
                        productDescription: product.productDescription,
                        productRating: product.productRating,
                        productStatus: product.productStatus,
                        productQuantity: product.productQuantity,
                        productUnit: product.productUnit,
                        productDiscount: product.productDiscount,
                    });
                }
                return await cart.save();
            } else {
                const product = await Product.findById(productId);
                if (!product) {
                    throw new Error('Product not found');
                }
                const newCart = new Cart({
                    userId,
                    items: [{
                        productId: product._id,
                        quantity,
                        productName: product.productName,
                        productCategory: product.productCategory,
                        productImage: product.productImage,
                        productOriginalRate: product.productOriginalRate,
                        productCurrentRate: product.productCurrentRate,
                        productDescription: product.productDescription,
                        productRating: product.productRating,
                        productStatus: product.productStatus,
                        productQuantity: product.productQuantity,
                        productUnit: product.productUnit,
                        productDiscount: product.productDiscount,
                    }]
                });
                return await newCart.save();
            }
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    async removeFromCart(userId, productId) {
        return Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId } } },
            { new: true }
        );
    }

    async clearCart(userId) {
        return Cart.findOneAndDelete({ userId });
    }

    async updateCart(userId, items) {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return null;
        }

        for (const item of items) {
            const { productId, quantity } = item;

            // Validate required fields for each item
            if (!productId || !quantity) {
                throw new Error('Product ID and quantity are required for each item');
            }

            const itemIndex = cart.items.findIndex(cartItem => cartItem.productId.toString() === productId);

            if (itemIndex === -1) {
                // If the item doesn't exist, add it to the cart
                const product = await Product.findById(productId);
                if (!product) {
                    throw new Error(`Product with ID ${productId} not found`);
                }
                cart.items.push({
                    productId: product._id,
                    quantity: quantity,
                    productName: product.productName,
                    productCategory: product.productCategory,
                    productImage: product.productImage,
                    productOriginalRate: product.productOriginalRate,
                    productCurrentRate: product.productCurrentRate,
                    productDescription: product.productDescription,
                    productRating: product.productRating,
                    productStatus: product.productStatus,
                    productQuantity: product.productQuantity,
                    productUnit: product.productUnit,
                    productDiscount: product.productDiscount,
                });
            } else {
                // If the item exists, update the quantity
                cart.items[itemIndex].quantity = quantity;
            }
        }

        // Save the updated cart
        await cart.save();
        return cart;
    }

    async watchCartChanges(userId) {
        const pipeline = [
            { $match: { 'fullDocument.userId': mongoose.Types.ObjectId(userId) } }
        ];
        const changeStream = Cart.watch(pipeline);
        return changeStream;
    }
}


module.exports = new CartService();
