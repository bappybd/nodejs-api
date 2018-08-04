import express from "express";
const userRouter = express.Router();
import auth from "../auth";
import passport from 'passport';
import User from "../../models/User";
import ApiResponse from "../../models/ApiResponse";

import user_controller from "../../controllers/userController";


// Testing controoler for User.
userRouter.get('/', user_controller.index);
userRouter.post('/', user_controller.create);
userRouter.post('/login', user_controller.login);
userRouter.get('/profile', user_controller.profile);

userRouter.use(function(err,req,res,next){
    if(err.name === 'ValidationError'){
        return res.json({
            errors: Object.keys(err.errors).reduce(function(errors ,key){
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        })
    }
    return next(err);
});

export default userRouter;