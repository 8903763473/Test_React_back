const express = require('express');
const checkoutController = require('../controller/checkoutController');
const router = express.Router();

router.post('/checkoutProducts', checkoutController.createCheckout);
router.get('/getAllCheckouts', checkoutController.getAllCheckouts);
router.get('/getCheckoutsByUserId/:userId', checkoutController.getCheckoutsByUserId);
router.get('/getCheckoutById/:checkoutId', checkoutController.getCheckoutById);

router.get('/getOverAllOrders', checkoutController.getOverallOrders);
router.get('/getMyOrdersById/:id', checkoutController.getOrderById);
router.get('/getMyOrdersByuserId/:userId', checkoutController.getOrdersByUserId);
module.exports = router;