import passport from 'passport';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
var User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done){
    User.findOne({email: email}).then(function(user){
        if(!user || !user.validPassword(password)){
            return done(null, false, {errors: {"email or password":"is invalid."}})
        }
        return done(null, user);
    }).catch(done);
}));

