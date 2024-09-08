// services/cartService.js
const Cart = require('../model/cartModel');
const Product = require('../model/productModel');

class CartService {
    async getCart(userId) {
        return Cart.findOne({ userId }).populate('items.productId');
    }

    async addToCart(userId, productId, quantity) {
        try {
            // Find the existing cart for the user
            let cart = await Cart.findOne({ userId }).populate('items.productId');

            if (cart) {
                // Check if the product is already in the cart
                const itemIndex = cart.items.findIndex(item => item.productId._id.toString() === productId.toString());

                if (itemIndex > -1) {
                    // Product already exists in the cart, update quantity
                    cart.items[itemIndex].quantity += quantity;
                } else {
                    // Product does not exist in the cart, add it
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
                // Save the updated cart
                return await cart.save();
            } else {
                // Cart does not exist, create a new one
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
            // Handle errors
            throw new Error(`Failed to add to cart: ${error.message}`);
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
}

module.exports = new CartService();
