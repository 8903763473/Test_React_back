const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: 'rzp_test_8Hsb2JqvzddDdG',
    key_secret: 'tSp8P68D5pS9qDi5RVntlXos'
});

class PaymentService {

    async createOrder(amount, currency) {
        const options = {
            amount: amount,
            currency,
            receipt: 'order_' + new Date().getTime()
        };

        try {
            const order = await razorpay.orders.create(options);
            console.log(order);
            return order;
        } catch (error) {
            throw new Error(error);
        }
    }

    verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
        const hmac = crypto.createHmac('sha256', razorpay.key_secret);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature === razorpay_signature) {
            return { status: 'success' };
        } else {
            return { status: 'failure', message: 'Signature mismatch' };
        }
    }
}

module.exports = new PaymentService();