const CartService = require('../service/cartService');
const socket = require('../../socket');

exports.getCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const cart = await CartService.getCart(userId);
        if (!cart) {
            return res.status(204).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { productId, quantity } = req.body;
        const updatedCart = await CartService.addToCart(userId, productId, quantity);

        const io = socket.getIo();
        io.to(userId).emit('cartData', updatedCart);

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.query.userId;
        const { productId } = req.params;
        const updatedCart = await CartService.removeFromCart(userId, productId);
        const io = socket.getIo();
        io.to(userId).emit('cartData', updatedCart);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.clearCart = async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        await CartService.clearCart(userId);
        const io = socket.getIo();
        io.to(userId).emit('cartData', []);
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateCart = async (req, res) => {
    try {
        const { userId, items } = req.body;

        if (!userId || !Array.isArray(items)) {
            return res.status(400).json({ message: 'User ID and items array are required' });
        }

        const updatedCart = await CartService.updateCart(userId, items);

        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found or failed to update' });
        }

        res.json({ message: 'Cart updated successfully', updatedCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


