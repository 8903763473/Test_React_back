const express = require('express');
const checkoutController = require('../controller/checkoutController');
const router = express.Router();

router.post('/checkoutProducts', checkoutController.createCheckout);
router.get('/getAllCheckouts', checkoutController.getAllCheckouts);
router.get('/TrackOrder/:checkoutId', checkoutController.getCheckoutById);

router.get('/getOverAllOrders', checkoutController.getOverallOrders);
router.get('/getMyOrdersByuserId/:userId', checkoutController.getOrdersByUserId);

module.exports = router;