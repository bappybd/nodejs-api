const express = require("express");
const productRouter = express.Router();
const mongoose = require("mongoose");
var Product = mongoose.model('Product');
var Response = require("./apiResponse");

productRouter
    .get('/products', (req, res) => {
        Product.find({}, (err, products) => {
            res.json(new Response(products, 'Product'));
        });        
    })
    /*.get('/dummy', (req, res) => {
        let product = new Product({title: "Product 1", desc: "Test Product 1 Desc", sku: "product#1"});
        product.save();
        res.status(201).send(product);
    });*/

module.exports = productRouter;
