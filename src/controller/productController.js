const productService = require('../service/productService');

class ProductController {
    async createProduct(req, res) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await productService.getProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await productService.updateProduct(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const product = await productService.deleteProduct(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductsByCategory(req, res) {
        try {
            console.log(req.params.category);
            const products = await productService.getProductsByCategory(req.params.category);
            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found for this category' });
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getHighOfferProducts(req, res) {
        try {
            const products = await productService.getHighOfferProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTrendingProducts(req, res) {
        try {
            const products = await productService.getTrendingProducts();
            res.status(200).json({ success: true, data: products });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async searchProducts(req, res) {
        const { query } = req.query; 

        if (!query) {
            return res.status(400).json({ message: 'Query is required' });
        }

        try {
            const products = await productService.searchProducts(query);
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving products', error: error.message });
        }
    }


    async autoComplete(req, res) {
        const { query } = req.query;    
        if (!query) {
            return res.status(400).json({ message: 'Query is required' });
        }    
        try {
            const products = await productService.autoComplete(query);
            const productNames = products.map(product => ({ productName: product.productName }));
            return res.status(200).json(productNames); 
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving products', error: error.message });
        }
    }
    


}



module.exports = new ProductController();
