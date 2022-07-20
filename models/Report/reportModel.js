const mongoose = require("mongoose");
const Joi = require('joi');

const reportSchema = new mongoose.Schema({
    report: {
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
            },
            email: {
                type: String,
                required: true,
                minlength: 7,
                maxlength: 255,
                unique: true,
                trim: true
            }
        }),
        required: true
    },
    post: {
        type: new mongoose.Schema({
            author_id:{
                type: mongoose.Schema.Types.ObjectId
            }
        }),
        required: true
    },
    type:{
        type: String,
        required: true
    }
});
const Report = mongoose.model("Report", reportSchema);

function validateReport(report){
    const schema = Joi.object({
        report : Joi.string().min(1).required(),
        postId : Joi.objectId().required(),
        type: Joi.string().min(1).required()
    });
    return schema.validate(report);
}

module.exports.reportSchema = reportSchema;
module.exports.Report= Report;
module.exports.validateReport = validateReport;