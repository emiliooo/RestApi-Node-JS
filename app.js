const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://emil:'+process.env.MONGO_ATLAS_PW+'@cluster0-edw5b.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true 
    })

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('uploads', express.static('uploads'));

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );

    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({})
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        err: {
            message: err.message
        }
    })
});

module.exports = app;