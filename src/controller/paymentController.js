const paymentService = require('../service/paymentService');

class PaymentController {

    async createOrder(req, res) {
        const { amount, currency } = req.body;

        try {
            console.log(req.body);

            const order = await paymentService.createOrder(amount, currency);
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    verifyPayment(req, res) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const verificationResult = paymentService.verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (verificationResult.status === 'success') {
            res.json(verificationResult);
        } else {
            res.status(400).json(verificationResult);
        }
    }
}

module.exports = new PaymentController();