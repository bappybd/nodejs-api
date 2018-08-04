import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import paginate from "express-paginate";

// Create the server app
const port = process.env.PORT || 5656;
const app = express();

// Read configurations
let config = JSON.parse(fs.readFileSync(path.join(__dirname, './config', 'settings.json'), 'utf8'));

// Use CORS
app.use(cors());

// Paginate
app.use(paginate.middleware(10, 50));

// Connect to Database
mongoose.connect(config.dbConnectionString);
mongoose.set('debug', true);

// Body Parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./config/passport');

// routes
app.get('/', (req, res) => {
    res.json({data: 'Hello World'});
});
import userRouter from './routes/api/userRouter';
app.use('/api/users', userRouter);

import productRouter from './routes/api/productRouter';
app.use('/api/products', productRouter);

import categoryRouter from './routes/api/categoryRouter';
app.use('/api/categories', categoryRouter);

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


