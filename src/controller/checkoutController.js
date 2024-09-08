const checkoutService = require('../service/checkoutService');

class CheckoutController {
    async createCheckout(req, res) {
        try {
            // Create the checkout
            const checkout = await checkoutService.createCheckout(req.body);

            // Send the email
            const emailResponse = await checkoutService.orderPlacedService(req.body.email);

            // Respond with the checkout data and email response
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

    async getCheckoutsByUserId(req, res) {
        try {
            console.log(req.params.userId);
            const checkouts = await checkoutService.getCheckoutsByUserId(req.params.userId);
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
    }

    async orderPlacedIntimation(req, res) {
        try {
            const { email } = req.body;
            const emailResponse = await emailService.orderPlacedService(email);
            res.status(200).json(emailResponse);
        } catch (error) {
            res.status(500).json({
                message: 'Failed to send invitation email',
                error: error.message
            });
        }
    }
}

module.exports = new CheckoutController();