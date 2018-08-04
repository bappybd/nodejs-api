import User from "../models/User";
import passport from 'passport';
import ApiResponse from "../models/ApiResponse";

exports.index = function(req, res, next) {
    try {
        User.find({}, (err, users) => {
            res.json(new ApiResponse(users, 'user'));
        });
    }catch (err){
        //next(err);
        return res.json({error: err.message})
    }
};

exports.create = function(req, res, next) {
    try {
        var user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.setPassword(req.body.password);
        user.validate()
        user.save().then(function(){
            return res.status(201).json({user: user.toAuthJSON()});
        }).catch(next);
    }catch (err){
        //next(err);
        return res.json({error: err.message})
    }

};

exports.login = function(req, res, next) {
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
};

exports.profile = function(req, res, next) {
    try {
        User.findById(req.payload.id).then(function(user){
            if(!user){return res.sendStatus(401);}
            return res.json({user: user.toAuthJSON()});
        }).catch(next);
    }catch (err){
        //next(err);
        return res.json({error: err.message})
    }
};
