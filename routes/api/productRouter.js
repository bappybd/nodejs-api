import express from "express";
const productRouter = express.Router();
import mongoose from "mongoose";
import auth from "../auth";
import faker from "faker";
import User from "../../models/User";
import Product from "../../models/Product";
import Category from "../../models/Category";
import ApiResponse from "../../models/ApiResponse";

productRouter.post('/', auth.required, (req, res, next) => {
        User.findById(req.payload.id).then(function(user){
            if(!req.body.title){
                return res.status(422).json({errors: {title: "can't be blank."}});
            }
            if(!req.body.price){
                return res.status(422).json({errors: {price: "can't be blank."}});
            }

            let product = new Product({title: req.body.title, desc: req.body.desc, price: req.body.price});
            product.save().then(function () {
                res.status(201).json({product: product });
            });
        }).catch(next);
    });

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

productRouter.use(function(err,req,res,next){
    // Handle ValidationError
    if(err.name === 'ValidationError'){
        return res.json({
            errors: Object.keys(err.errors).reduce(function(errors ,key){
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        });
    }

    // Handle unauthorization error
    else if(err.name === 'UnauthorizedError'){
        return res.json({
            errors: err
        });
    }

    return next(err);
});


export default productRouter;
