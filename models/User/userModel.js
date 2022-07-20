
const jwt =require ("jsonwebtoken");
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    email:{
        type: String,
        required: true,
        minlength: 7,
        maxlength: 255,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        minlength: 5,
        maxlength: 1024,
        default: null
    },
    isExpert: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    dob:{
        type: String,
        default: null
    },
    gender:{
        type: String,
        default: null
    },
    bio:{
        type: String,
        default: null
    },
    twitterUrl:{
        type:String,
        default:null
    },
    instagramUrl:{
        type: String,
        default: null
    },
    linkedInUrl:{
        type: String,
        default: null
    },
    location:{
        type: String,
        default: null
    }
    
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id , isExpert : this.isExpert , isVerified: this.isVerified}, process.env.TOKEN_SECRET);
    return token;
}


userSchema.methods.generateVerifyToken = function(){
    const token = jwt.sign({_id: this._id , isExpert : this.isExpert }, process.env.VERIFY_TOKEN_SECRET);
    return token;
}

userSchema.methods.generateResetToken = function(){
    const token = jwt.sign({_id: this._id , isExpert : this.isExpert}, process.env.RESET_TOKEN_SECRET,{ expiresIn: '10m'});
    return token;
}

const User = mongoose.model('User', userSchema );


function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}


function validateLogin(user){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(user);
}


function validateUserEmail(user){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email()
    });
    return schema.validate(user);
}

function validateUserPassword(user){
    const schema = Joi.object({
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}





module.exports.userSchema = userSchema;
module.exports.User = User;
module.exports.validateUser= validateUser;
module.exports.validateLogin= validateLogin;
module.exports.validateUserEmail= validateUserEmail;
module.exports.validateUserPassword= validateUserPassword;

