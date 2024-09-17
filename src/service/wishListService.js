const Wish = require('../model/wishListModel');
const Product = require('../model/productModel');

class wishListService {
    async getWish(userId) {
        return Wish.findOne({ userId }).populate('items.productId');
    }

    async addToWish(userId, productId, quantity) {
        try {
            let wish = await Wish.findOne({ userId }).populate('items.productId');

            if (wish) {
                const itemIndex = wish.items.findIndex(item => item.productId._id.toString() === productId.toString());

                if (itemIndex > -1) {
                    wish.items[itemIndex].quantity += quantity;
                } else {
                    const product = await Product.findById(productId);
                    if (!product) {
                        throw new Error('Product not found');
                    }
                    wish.items.push({
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
                return await wish.save();
            } else {
                const product = await Product.findById(productId);
                if (!product) {
                    throw new Error('Product not found');
                }
                const newWish = new Wish({
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
                return await newWish.save();
            }
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    async removeFromWish(userId, productId) {
        return Wish.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId } } },
            { new: true }
        );
    }

    async clearWish(userId) {
        return Wish.findOneAndDelete({ userId });
    }
}

module.exports = new wishListService();
