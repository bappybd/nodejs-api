import mongoose from "mongoose";
const Schema = mongoose.Schema;
import uniqueValidator from "mongoose-unique-validator";
import crypto from "crypto";
import jwt from "jsonwebtoken";
var secret = require("../config").secret;

var UserSchema = new Schema({
    username: {type: String, unique: true, required: [true, "cannot be empty."], lowercase: true, index: true},
    email: {type: String, unique: true, required: [true, "cannot be empty."], lowercase: true, index: true},
    bio: String,
    image: String,
    salt: String,
    hash: String
}, {timestamps: true});

// Unique field validation
UserSchema.plugin(uniqueValidator, {message: "is already taken."});

//NEW CODE BENEATH THIS COMMENT
UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function(){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate()+60);
    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime()/1000)
    }, secret)
};

UserSchema.methods.toAuthJSON = function(){
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        token: this.generateJWT()
    };
};

export default mongoose.model("User", UserSchema);
