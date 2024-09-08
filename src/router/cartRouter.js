// routes/cartRouter.js
const express = require('express');
const router = express.Router();
const CartController = require('../controller/cartController');

router.post('/getmyCart', CartController.getCart);
router.post('/addtoCart', CartController.addToCart);
router.delete('/removeCart/:productId', CartController.removeFromCart);
router.delete('/clearMyCart', CartController.clearCart);

module.exports = router;
