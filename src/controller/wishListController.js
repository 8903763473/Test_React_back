const wishService = require('../service/wishListService');

exports.getWish = async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const wish = await wishService.getWish(userId);
        if (!wish) {
            return res.status(204).json({ message: 'WishList not found' });
        }
        res.json(wish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addToWish = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { productId, quantity } = req.body;
        const updatedWish = await wishService.addToWish(userId, productId, quantity);
        res.json(updatedWish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromWish = async (req, res) => {
    try {
        const userId = req.query.userId; 
        const { productId } = req.params;
        const updatedWish = await wishService.removeFromWish(userId, productId);
        res.json(updatedWish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.clearWish = async (req, res) => {
    try {
        const userId = req.query.userId;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        await wishService.clearWish(userId);
        res.json({ message: 'WishList cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


