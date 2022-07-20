const {Solution, validateSolution } = require("../../models/Solution/solutionModel");
const {Query} = require("../../models/Query/queryModel");
const sendSolutionEmail = require("../../resources/solutionMail");
const expertAuth = require("../../middleware/expertAuth");
const {User} = require("../../models/User/userModel");
const {Expert} = require("../../models/Expert/expertModel")
const express = require("express");
const router = express.Router();


//expert post solution a query
router.post("/add", expertAuth, async (req,res) => {
    try{
        const {error} = validateSolution(req.body);
        if (error) return res.status(400).json(
            {
                error : error.details[0].message
            });

        const expert = await Expert.findById(req.expert._id);
        if (!expert) return res.status(400).json(
            {
                error:"Invalid user."
            });

        const query = await Query.findById(req.body.queryId);
        if(!query) return res.status(400).json(
            {
                error:"Invalid Query"
            });

        const solution = new Solution ({
            solution: req.body.solution,
            author:{
                _id: expert._id,
                name : expert.name
            },
            query:{
                _id: req.body.queryId,
                author_id : query.author._id
            }
        })
        await solution.save();
        const token = query._id;
        await sendSolutionEmail(query.author.email, token, query.author.name, expert.name);
        res.json({
            message : "solution updated successfully"
        })
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "something went wrong try after some time!", 
        });
    }
})


router.put ("/update/:id", expertAuth, async (req, res) => {
    try{
        const {error} = validateSolution(req.body);
        if (error) return res.status(400).json(
            {
                error : error.details[0].message
            });

        const expert = await User.findById(req.expert._id);
        if (!expert) return res.status(400).json(
            {
                error:"Invalid expert."
            });

        const solution = await Solution.findById(req.params.id);
        if (!solution) return res.status(404).json(
            {
                error:"The solution with the given ID was not found."
            });

        if(solution.author._id != req.expert._id){
            return res.status(401).json(
                {
                    error:"access denied."
                });
        }
        
        await Solution.findByIdAndUpdate(req.params.id, {
            solution: req.body.solution 
        }, {new: true});
        res.json(
            {
                message:"updated successfully"
            });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "update went wrong try after some time!", 
        });
    }
})

//experts can delete their solutions 
router.delete("/delete/:id", expertAuth, async (req, res) => {
    const solution = await Solution.findById(req.params.id);

    if(!solution) return res.status(400).json(
        {
            error: "The Solution with the given ID was not found."
        });

    if(solution.author._id != req.user._id){
        return res.status(401).json(
            {
                error:"access denied."
            });
    }
    await Solution.findByIdAndRemove(req.params.id);
    res.json(
        {
            message:"Solution deleted successfully"
        });
});

module.exports = router;