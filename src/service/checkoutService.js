const Checkout = require('../model/checkoutModel');
const Cart = require('../model/cartModel');
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    debug: true,
    tls: {
        rejectUnauthorized: false
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

const generateUniqueOrderId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderId = '';
    for (let i = 0; i < 6; i++) {
        orderId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return orderId;
}

class CheckoutService {

    async createCheckout(checkoutData) {
        try {
            const orderId = generateUniqueOrderId();
            const checkout = new Checkout({
                ...checkoutData,
                orderId
            });
            await checkout.save();

            const userId = checkoutData.userId;
            await Cart.deleteMany({ userId: userId });
            return checkout;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async getAllCheckouts() {
        try {
            const checkouts = await Checkout.find().populate('products.productId');
            return checkouts;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async getCheckoutById(orderId) {
        try {
            const checkout = await Checkout.findOne({ orderId }).populate('products.productId');
            return checkout;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async orderPlacedService(email) {
        return new Promise(async (resolve, reject) => {
            let mailOptions = {
                from: 'chatwithus5581@gmail.com',
                to: email,
                subject: 'Order Placed Successfully !',
                html: `
                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center;">
            <img src="cid:groceryLogo" alt="groceryLogo" style="width: 120px; height: auto; margin-bottom: 20px;"/>
        </div>
        <h1 style="color: #333; text-align: center; margin-bottom: 20px;">Order Confirmation</h1>
        <p style="font-size: 16px; color: #555; text-align: center; margin-bottom: 20px;">Your order has been placed successfully. Thank you for shopping with us!</p>
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">
        <p style="font-size: 14px; color: #777; text-align: center;">"The best way to predict the future is to create it." – Welcome Grocery</p>
        <div style="text-align: center; margin-top: 20px;">
            <p style="font-size: 14px; color: #333;">If you have any questions, feel free to contact us at <a href="mailto:chatwithus5581@gmail.com" style="color: #007bff;">chatwithus5581@gmail.com</a>.</p>
        </div>
    </div>
            `,
                attachments: [
                    {
                        filename: 'groceryLogo.png',
                        path: path.join(__dirname, '../groceryLogo.png'),
                        cid: 'groceryLogo'
                    }
                ]
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error occurred:', error);
                    return reject({
                        message: 'Email sending failed',
                        error: error.message
                    });
                }
                console.log('Email sent:', info.response);
                resolve({
                    message: 'Email sent successfully',
                    info: info.response
                });
            });
        });
    };

    async getOverallOrders() {
        try {
            return await Checkout.find().populate('userId', 'name email').populate('products.productId');
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async getOrdersByUserId(userId) {
        try {
            return await Checkout.find({ userId }).populate('userId', 'name email').populate('products.productId');
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = new CheckoutService();