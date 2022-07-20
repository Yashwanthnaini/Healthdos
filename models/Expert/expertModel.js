
const jwt =require ("jsonwebtoken");
const mongoose = require('mongoose');
const Joi = require('joi');

const expertSchema = new mongoose.Schema({
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
        default: true
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
    expertIn:{
        type: Array,
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

expertSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id , isExpert : this.isExpert , isVerified: this.isVerified}, process.env.TOKEN_SECRET);
    return token;
}


expertSchema.methods.generateVerifyToken = function(){
    const token = jwt.sign({_id: this._id , isExpert : this.isExpert }, process.env.VERIFY_TOKEN_SECRET);
    return token;
}

expertSchema.methods.generateResetToken = function(){
    const token = jwt.sign({_id: this._id , isExpert : this.isExpert}, process.env.RESET_TOKEN_SECRET,{ expiresIn: '10m'});
    return token;
}

const Expert = mongoose.model('Expert', expertSchema );


function validateExpert(expert){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(expert);
}


function validateLogin(expert){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(expert);
}


function validateExpertEmail(expert){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email()
    });
    return schema.validate(expert);
}

function validateExpertPassword(expert){
    const schema = Joi.object({
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(expert);
}





module.exports.expertSchema = expertSchema;
module.exports.Expert = Expert;
module.exports.validateExpert= validateExpert;
module.exports.validateLogin= validateLogin;
module.exports.validateExpertEmail= validateExpertEmail;
module.exports.validateExpertPassword= validateExpertPassword;

