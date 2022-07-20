const mongoose = require("mongoose");
const Joi = require('joi');

const solutionSchema = new mongoose.Schema({
    solution: {
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
    query: {
        type: new mongoose.Schema({
            author_id:{
                type: mongoose.Schema.Types.ObjectId
            }
        }),
        required: true
    }
});
const Solution = mongoose.model("Solution", solutionSchema);

function validateSolution(solution){
    const schema = Joi.object({
        solution : Joi.string().min(1).required(),
        queryId : Joi.objectId().required(),
    });
    return schema.validate(solution);
}

module.exports.solutionSchema = solutionSchema;
module.exports.Solution= Solution;
module.exports.validateSolution = validateSolution;