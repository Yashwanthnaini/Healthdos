const {Feedback,validateFeedback} = require("../../models/Feedback/feedbackModel");
const auth = require("../../middleware/authorization");
const {User} = require("../../models/User/userModel");
const {Post} = require("../../models/Post/postModel");
const {Query} = require("../../models/Query/queryModel");
const sendFeedbackEmail = require("../../resources/feedbackMail");
const {Solution} = require("../../models/Solution/solutionModel");
const express = require("express");
const router = express.Router();


router.post("/add", auth, async (req,res) => {
    try{
        const {error} = validateFeedback(req.body);
        if (error) return res.status(400).json({error : error.details[0].message});

        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).send("Invalid user.");
        let post ;
        if(req.body.type==="post"){
            post = await Post.findById(req.body.postId);
        }
        else if (req.body.type==="query"){
            post = await Query.findById(req.body.postId);
        }
        else {
            post = await Solution.findById(req.body.PostId);
        }
        
        if(!post) return res.status(400).send(`invalid ${req.body.type}`);

        const feedback = new Feedback ({
            feedback: req.body.feedback,
            author:{
                _id: user._id,
                name : user.name
            },
            post:{
                _id: req.body.postId,
                author_id:post.author._id
            }
        })
        await feedback.save();
        const token = post._id;
        await sendFeedbackEmail(post.author.email, token, post.author.name, req.body.type, user.name);
        res.json({
            message : "feedback updated successfully"
        })
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "feedback update failed, try after some time!", 
        });
    }


})

router.put ("/update/:id", auth, async (req, res) => {
    try{
        const {error} = validateFeedback(req.body);
        if (error) return res.status(400).json({error : error.details[0].message});

        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).send("Invalid user.");

        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) return res.status(404).send("The feedback with the given ID was not found.");

        if(feedback.author._id != req.user._id){
            return res.status(401).send("access denied.");
        }
        
        await Feedback.findByIdAndUpdate(req.params.id, {
            feedback: req.body.feedback
        }, {new: true});
        res.send("updated successfully");
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "something went wrong try after some time!", 
        });
    }
})

router.delete("/delete/:id", auth, async (req, res) => {
    const feedback = await Feedback.findById(req.params.id);

    if(!feedback) return res.status(400).send("The feedback with the given ID was not found.");

    if(feedback.author._id != req.user._id){
        return res.status(401).send("access denied.");
    }
    await Feedback.findByIdAndRemove(req.params.id);
    res.send("feedback deleted");
});

module.exports = router;