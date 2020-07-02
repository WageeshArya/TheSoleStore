const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const productRoute = require('./products/productRoute');
const orderRoute = require('./orders/orderRoute');
const userRoute = require('./users/userRoute');
const adminRoute = require('./admins/adminRoute');
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Authorization, Accept');
    if(res.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
    }
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/users', userRoute);
app.use('/admin', adminRoute);


app.use((req, res, next) => {
    const error = new Error();
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500 ).json({
        error: error
    })
});

module.exports = app;