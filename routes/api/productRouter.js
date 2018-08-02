import express from "express";
const productRouter = express.Router();
import mongoose from "mongoose";
import Product from "../../models/Product";
import ApiResponse from "../../models/ApiResponse";

productRouter.route('/')
    .get((req, res) => {
        Product.find({}, (err, products) => {
            res.json(new ApiResponse(products, 'product'));
        });        
    })
    .post((req, res) => {
        let product = new Product({title: req.body.title, desc: req.body.desc});
        product.save();
        res.status(201).send(product);
    });   

    /*.get('/dummy', (req, res) => {
        let product = new Product({title: "Product 1", desc: "Test Product 1 Desc", sku: "product#1"});
        product.save();
        res.status(201).send(product);
    });*/

productRouter.route('/:productId')
   .put((req, res) => {
        Product.findById(req.params.productId, (err, product) => {
            product.title = req.body.title;
            product.desc = req.body.desc;            
            product.save();
            res.json(product);
        });
    })
    .delete((req,res)=>{
        Product.findById(req.params.productId, (err, product) => {
            product.remove(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    })//delete 

export default productRouter;
