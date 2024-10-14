const checkoutService = require('../service/checkoutService');

class CheckoutController {
    async createCheckout(req, res) {
        try {
            const checkout = await checkoutService.createCheckout(req.body);
            const emailResponse = await checkoutService.orderPlacedService(req.body.email);
            res.status(201).json({
                checkout,
                emailResponse
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllCheckouts(req, res) {
        try {
            const checkouts = await checkoutService.getAllCheckouts();
            res.status(200).json(checkouts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCheckoutById(req, res) {
        try {
            console.log(req.params.checkoutId);
            const checkout = await checkoutService.getCheckoutById(req.params.checkoutId);
            res.status(200).json(checkout);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getOverallOrders(req, res) {
        try {
            const orders = await checkoutService.getOverallOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    async getOrdersByUserId(req, res) {
        const { userId } = req.params;
        try {
            const orders = await checkoutService.getOrdersByUserId(userId);
            if (orders.length === 0) {
                return res.status(404).json({ message: 'No orders found for this user' });
            }
            console.log(orders);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

}

module.exports = new CheckoutController();