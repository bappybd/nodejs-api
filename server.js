const express = require("express");
const mongoose = require("mongoose");

// Create the server app
const port = process.env.PORT || 5656;
const app = express();

// Models
require("./models/Product");

// routes
app.get('/', (req, res) => {
    res.json({data: 'Hello World'});
});
app.use(require('./routes'));
// Catch 404 and forward to error handler
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Connect to Database
mongoose.connect("mongodb://localhost/invoiceTest");
mongoose.set('debug', true);

// Start the server at port defined above
app.listen(port, () => {
    console.log(`Server started at ${port}: port, URL: http://localhost:${port}`);
});


