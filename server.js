import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// Create the server app
const port = process.env.PORT || 5656;
const app = express();

// Models
require("./models/Product");

// Connect to Database
mongoose.connect("mongodb://localhost/invoiceTest");
mongoose.set('debug', true);

// Body Parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
    res.json({data: 'Hello World'});
});

import productRouter from './routes/api/productRouter';
app.use('/api/products', productRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Start the server at port defined above
app.listen(port, () => {
    console.log(`Server started at ${port}: port, URL: http://localhost:${port}`);
});


