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
            let cart = await Cart.findOne({ userId });

            if (cart) {
                const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());

                if (itemIndex > -1) {
                    cart.items[itemIndex].quantity += quantity;
                } else {
                    cart.items.push({
                        productId: productId,
                        quantity
                    });
                }
                return await cart.save();
            } else {
                const newCart = new Cart({
                    userId,
                    items: [{ productId, quantity }]
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

    async updateCart(userId, productId, quantity) {
        try {
            let cart = await Cart.findOne({ userId });
            if (!cart) {
                throw new Error('Cart not found');
            }
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());
            if (itemIndex === -1) {
                throw new Error('Product not found in the cart');
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
            return await cart.save();
        } catch (error) {
            throw new Error(`${error.message}`);
        }
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
