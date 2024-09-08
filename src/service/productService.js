const Product = require('../model/productModel');

class ProductService {
    async createProduct(productData) {
        try {
            // Check if a product with the same name and category already exists
            const existingProduct = await Product.findOne({
                productName: productData.productName,
                productCategory: productData.productCategory,
            });

            if (existingProduct) {
                throw new Error('Product with the same name and category already exists.');
            }

            // If not found, create a new product
            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async getProducts() {
        try {
            return await Product.find();
        } catch (error) {
            throw new Error(`Error fetching products: ${error.message}`);
        }
    }

    async getProductById(productId) {
        try {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error(`Error fetching product by ID: ${error.message}`);
        }
    }

    async updateProduct(productId, updateData) {
        try {
            const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            const product = await Product.findByIdAndDelete(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            return { message: 'Product deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    async getProductsByCategory(category) {
        try {
            return await Product.find({ productCategory: category });
        } catch (error) {
            throw new Error(`Error fetching products by category: ${error.message}`);
        }
    }
}

module.exports = new ProductService();
