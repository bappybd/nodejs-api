import express from "express";
const userRouter = express.Router();
import auth from "../auth";
import passport from 'passport';
import User from "../../models/User";
import ApiResponse from "../../models/ApiResponse";

userRouter.route('/')
    .get((req, res) => {
        User.find({}, (err, users) => {
            res.json(new ApiResponse(users, 'user'));
        });
    })
    .post((req,res,next) => {
        var user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.setPassword(req.body.password);
        user.save().then(function(){
            return res.status(201).send(user.toAuthJSON());
        }).catch(next);
    });

userRouter.route('/login')
    .post((req,res,next) => {
        try {
            console.log(req.body);
            if(!req.body.email){
                return res.status(422).json({errors: {email: "can't be blank."}});
            }
            if(!req.body.password){
                return res.status(422).json({errors: {password: "can't be blank."}});
            }

            passport.authenticate('local', {session: false}, function(err, user, info){
                if(err){return next(err);}
                if(user){
                    user.token = user.generateJWT();
                    return res.json({user: user.toAuthJSON()});
                } else {
                    return res.json(info);
                }
            })(req,res,next)
        }catch (err){
            //next(err);
            return res.json({error: err.message})
        }
    });

/*userRouter.route('/profile', auth.required)
    .get((req,res,next) => {
        try {
            User.findById(req.payload.id).then(function(user){
                if(!user){return res.sendStatus(401);}
                return res.json({user: user.toAuthJSON()});
            }).catch(next);
        }catch (err){
            //next(err);
            return res.json({error: err.message})
        }


    });*/

userRouter.get('/profile', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}
        return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

export default userRouter;