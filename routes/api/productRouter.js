import express from "express";
const productRouter = express.Router();
import mongoose from "mongoose";
import faker from "faker";
import Product from "../../models/Product";
import Category from "../../models/Category";
import ApiResponse from "../../models/ApiResponse";
import paginate from "express-paginate";

productRouter.route('/')
    .get((req, res) => {
        Product.find({}, (err, products) => {
            res.json(new ApiResponse(products, 'product'));
        });        
    })
    .post((req, res) => {
        let product = new Product({title: req.body.title, desc: req.body.desc, price: req.body.price});
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
            product.categories = "5b6367f7925ca0286bb5f10c";           
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


productRouter.route('/genrate-fake-data')
    .get((req, res, next) => {
        for(var i = 0; i<90; i++){
            let product = new Product();
            product.title = faker.commerce.productName();
            product.price = faker.commerce.price();
            product.image = faker.image.image();

            product.save(function(err){
                if(err) throw err;
            });

            res.json({});
        }        
    })

productRouter.route('/search')
    .get(async (req, res, next) => {
  try {

    var perPage = 5;
    var page = req.query.page || 1;
    var q = req.query.q || '';
    
    let query = {};
    if(q.length > 0){
        var colName = 'title';
        query = {"title": {  "$regex": q, "$options": "i" }};
    }
    

console.log(req.query);

    Product
        .find(query)
        .populate('categories')
        .skip( (perPage * page) - perPage)
        .limit(perPage)
        .exec((err, products) => {
            Product.count(query).exec((err, count) => {
                if(err) return next(err)
                res.json({
                    type: 'product',
                    data: products,
                    pagination: {currentPage: page, totalCount: count, totalPages: Math.ceil(count / perPage), perPage : perPage}
                })
            })
        })

  } catch (err) {
    next(err);
  }

});


export default productRouter;
