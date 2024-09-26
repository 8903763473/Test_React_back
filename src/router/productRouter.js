const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.post('/CreateProducts', productController.createProduct);
router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductsById/:id', productController.getProductById);
router.put('/updateProducts/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.get('/getProductsByCategory/:category', productController.getProductsByCategory);

router.get('/getHighOfferProducts', productController.getHighOfferProducts);
router.get('/trendingProducts', productController.getTrendingProducts);


router.get('/search', productController.searchProducts);

module.exports = router;
