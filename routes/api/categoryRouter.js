import express from "express";
const categoryRouter = express.Router();
import mongoose from "mongoose";
import Category from "../../models/Category";
import ApiResponse from "../../models/ApiResponse";

categoryRouter.route('/')
    .get((req, res) => {
        Category.find({}, (err, categories) => {
            res.json(new ApiResponse(categories, 'category'));
        });        
    })
    .post((req, res) => {
        let category = new Category({title: req.body.title, desc: req.body.desc, price: req.body.price});
        category.save();
        res.status(201).send(category);
    });

categoryRouter.route('/:categoryId')
    .get((req, res) => {
        Category.findById(req.params.categoryId, (err, category) => {
            res.json(category);
        });
    })
   .put((req, res) => {
        Category.findById(req.params.categoryId, (err, category) => {
            category.title = req.body.title;
            category.desc = req.body.desc;            
            category.save();
            res.json(category);
        });
    })
    .delete((req,res)=>{
        Category.findById(req.params.categoryId, (err, category) => {
            category.remove(err => {
                if(err){
                    res.status(500).send(err)
                }
                else{
                    res.status(204).send('removed')
                }
            })
        })
    })//delete 

export default categoryRouter;
