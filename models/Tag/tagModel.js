const mongoose = require("mongoose");
const Joi = require('joi');

const tagSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        minlength : 1,
        maxlength : 50
    }
});
const Tag = mongoose.model("Tag", tagSchema);


function validateTag(tag){
    const schema = Joi.object({
        name : Joi.string().min(1).required()
    });
    return schema.validate(tag);
}

module.exports.tagSchema = tagSchema;
module.exports.Tag= Tag;
module.exports.validateTag = validateTag;