const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const CartService = require('./src/service/cartService');
const socketIo = require('socket.io');
const http = require('http');
const app = express();

const PORT = 8001;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect('mongodb://localhost:27017/Test_DB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Router imports
const caregoryRouter = require('./src/router/categoryRouter');
const productRouter = require('./src/router/productRouter');
const userRouter = require('./src/router/userRouter');
const cartRoute = require('./src/router/cartRouter');
const checkoutRoute = require('./src/router/checkoutRouter');
const contactRoute = require('./src/router/contactRouter');
const paymentRoute = require('./src/router/paymentRouter');
const wishListRoute = require('./src/router/wishListRouter');
const feedbackRoute = require('./src/router/feedbackRouters');

app.use('/api/grocery/category', caregoryRouter);
app.use('/api/grocery/product', productRouter);
app.use('/api/grocery/user', userRouter);
app.use('/api/grocery/cart', cartRoute);
app.use('/api/grocery/wish', wishListRoute);
app.use('/api/grocery/checkout', checkoutRoute);
app.use('/api/grocery/contact', contactRoute);
app.use('/api/grocery/payment', paymentRoute);
app.use('/api/grocery/feedback', feedbackRoute);

// SOCKET------------------------------------------------------------
const io = socketIo(8000, {
    cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling']
    }
});

io.on('connection', (socket) => {
    console.log('New client connected now', socket.id);
    socket.emit('test', { message: 'Hello from server' });

    socket.on('joinRoom', (userId) => {
        socket.join(userId);
        console.log(`User ${socket.id} joined room ${userId}`);
    });

    socket.on('getCart', async (userId) => {
        try {
            const cart = await CartService.getCart(userId);
            console.log('Emitting cart data:', cart);
            socket.emit('cartData', cart);

            const changeStream = await CartService.watchCartChanges(userId);
            changeStream.on('change', async () => {
                const updatedCart = await CartService.getCart(userId);
                socket.emit('cartData', updatedCart);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected', socket.id);
                changeStream.close(); // close changeStream properly
            });
        } catch (error) {
            console.error('Error fetching cart:', error);
            socket.emit('error', { message: error.message });
        }
    });


    // socket.on('getCart', async (userId) => {
    //     try {
    //         const cart = await CartService.getCart(userId);
    //         console.log('Emitting cart data:', cart);
    //         socket.emit('cartData', cart);

    //         const changeStream = CartService.watchCartChanges(userId);
    //         changeStream.on('change', async () => {
    //             const updatedCart = await CartService.getCart(userId);
    //             socket.emit('cartData', updatedCart);
    //         });

    //         socket.on('disconnect', () => {
    //             console.log('Client disconnected', socket.id);
    //             if (changeStream) changeStream.close();
    //         });
    //     } catch (error) {
    //         console.error('Error fetching cart:', error);
    //         socket.emit('error', { message: error.message });
    //     }
    // });

});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
