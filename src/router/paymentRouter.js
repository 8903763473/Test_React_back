const express = require('express');
const paymentController = require('../controller/paymentController');
const router = express.Router();

router.post('/create-order', paymentController.createOrder);
router.post('/verify-payment', paymentController.verifyPayment);

module.exports = router;
