// controllers/cartController.js
const CartService = require('../service/cartService');
// const io = require('../socket');

exports.getCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const cart = await CartService.getCart(userId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addToCart = async (req, res) => {
    try {
        const userId = req.body.userId; // Assuming you have user info in req.user
        const { productId, quantity } = req.body;
        const updatedCart = await CartService.addToCart(userId, productId, quantity);
        // io.to(userId).emit('cartData', updatedCart);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.query.userId; // Now getting userId from query
        const { productId } = req.params;
        const updatedCart = await CartService.removeFromCart(userId, productId);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const userId = req.query.userId; // Fetch from query parameters
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        await CartService.clearCart(userId);
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


