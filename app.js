const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const CartService = require('./src/service/cartService');
const socketIo = require('socket.io');
const http = require('http');
const socket = require('./socket'); 

const app = express();
const server = http.createServer(app); 

const PORT = 8001;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect('mongodb://localhost:27017/Test_DB')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Connection error", err);
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

// const io = socketIo(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"],
//         transports: ['websocket', 'polling']
//     }
// });

// io.on('connection', (socket) => {
//     console.log('New client connected:', socket.id);
//     socket.emit('test', { message: 'Hello from server' });

//     socket.on('joinRoom', (userId) => {
//         socket.join(userId);
//         console.log(`User ${socket.id} joined room ${userId}`);
//     });
// });

// module.exports = { io }; 


socket.init(server);

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
