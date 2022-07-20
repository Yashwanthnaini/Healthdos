const mongoose = require("mongoose");
const Joi = require('joi');

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type : String,
        required : true
    },
    author: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    post: {
        type: new mongoose.Schema({
            author_id: mongoose.Schema.Types.ObjectId
        }),
        required: true
    }
});
const Feedback = mongoose.model("Feedback", feedbackSchema);

function validateFeedback(feedback){
    const schema = Joi.object({
        feedback : Joi.string().min(1).required(),
        postId : Joi.objectId().required(),
        type: Joi.string().required()
    });
    return schema.validate(feedback);
}

module.exports.feedbackSchema = feedbackSchema;
module.exports.Feedback= Feedback;
module.exports.validateFeedback = validateFeedback;