const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 8000;


app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


mongoose.connect('mongodb://localhost:27017/Test_DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


const caregoryRouter = require('./src/router/categoryRouter');
const productRouter = require('./src/router/productRouter');
const userRouter = require('./src/router/userRouter');
const cartRoute = require('./src/router/cartRouter');


app.use('/api/category', caregoryRouter);
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRoute);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
