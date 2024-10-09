const Wish = require('../model/wishListModel');
const Product = require('../model/productModel');

class wishListService {
    async getWish(userId) {
        return Wish.findOne({ userId }).populate('items.productId', '_id -__v');
    }

    async addToWish(userId, productId, quantity) {
        let wish = await Wish.findOne({ userId });

        if (wish) {
            const itemIndex = wish.items.findIndex(item => item.productId.toString() === productId.toString());

            if (itemIndex > -1) {
                wish.items[itemIndex].quantity += quantity;
            } else {
                wish.items.push({ productId, quantity });
            }
            return await wish.save();
        } else {
            const newWish = new Wish({
                userId,
                items: [{ productId, quantity }]
            });
            return await newWish.save();
        }
    }


    async removeFromWish(userId, productId) {
        return Wish.findOneAndUpdate(
            { userId },
            { $pull: { items: { 'productId': productId } } },
            { new: true }
        );
    }

    async clearWish(userId) {
        return Wish.findOneAndDelete({ userId });
    }
}

module.exports = new wishListService();
