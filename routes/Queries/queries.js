const {Query,validateQuery} = require("../../models/Query/queryModel");
const {Feedback} = require("../../models/Feedback/feedbackModel");
const {Solution} = require("../../models/Solution/solutionModel");
const auth = require("../../middleware/authorization");
const expertAuth = require("../../middleware/expertAuth");
const {User} = require("../../models/User/userModel");
const express = require("express");
const router = express.Router();

//expert can get query
router.get("/get/:id", expertAuth, async (req, res) => {
    try{
        const query = await Query.findById(req.params.id);
        if(!query){
            return res.status(404).json({
                error : "This query doesn't exist"
            })
        }
        const solutions = await Solution
                                    .find({"query._id":query._id})
                                    .select("solution author.name author._id")
        const feedbacks = await Feedback
                                    .find({"post._id":query._id})
                                    .select("feedback author.name author._id")
        res.json({
            query : query,
            solutions: solutions,
            feedbacks : feedbacks
        })
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "something went wrong try after some time!", 
        });
    }
})

//experts can get list of queries
router.get("/get/:pagesize/:pagenum", expertAuth, async(req,res)=>{
    const pagesize = req.params.pagesize
    const pagenum = req.params.pagenum
    try{
        const queries = await Query
                            .find()
                            .sort("-date")
                            .select("_id title data author.name tags date")
                            .skip(pagesize*(pagenum-1))
                            .limit(pagesize);
        if(!queries){
            return res.json({
                message : "No queries found"
            })
        }
        const count = await Query.countDocuments({});
        res.json({
            queries : queries,
            totalqueries : count
        });                    
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "fetching queries went wrong try after some time!", 
        });
    }
});



//user can get his/her list of queries 
router.get("/get/myqueries/:pagesize/:pagenum", auth, async(req,res)=>{
    const pagesize = req.params.pagesize
    const pagenum = req.params.pagenum
    try{
        const queries = await Query
                            .find({"author._id" : req.user._id})
                            .sort("-date")
                            .select("_id title data author.name tags date")
                            .skip(pagesize*(pagenum-1))
                            .limit(pagesize);
        if(!queries){
            return res.json({
                message : "No queries found",
                totalqueries : 0
            })
        }
        const count = await Query.countDocuments({"author._id" : req.user._id});
        res.json({
            queries : queries,
            totalqueries : count
        });                    
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "fetching queries went wrong, try after some time!", 
        });
    }
});


//expert can get list of queries related to his/her expertisedIn data
router.get("/interested", expertAuth, async (req, res) => {
    try{

        const expert = await Expert.findById(req.expert._id);
        if (!expert) return res.status(400).json(
            {
                error:"Invalid user."
            });

        if(expert.expertIn==null){
            return res.status(400).json(
                {
                    error : "can't find expert interests"
                });
        }
        const queries = await Query.find({ tags: { $in: expert.expertIn }}).select("-__v");
        
        res.json({
            queries : queries
        })
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "something went wrong try after some time!", 
        });
    }
})


//loged in user can create a new query
router.post("/add", auth, async(req, res)=>{
    try{
        const {error} = validateQuery(req.body);
         if (error) return res.status(400).json(
            {
                error : error.details[0].message
            });
        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).json(
            {
                error : "Invalid user."
            });

        const query = new Query({
            title: req.body.title,
            author: {
                _id: user._id,
                name: user.name,
                email:user.email
            },
            data : req.body.data,
            tags : req.body.tags
        });
        await query.save();
        res.json({
            message : "query created successfully"
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "something went wrong try after some time!", 
        });
    }
});

//user can update his/her query
router.put ("/update/:id", auth, async (req, res) => {
    try{
        const {error} = validateQuery(req.body);
         if (error) return res.status(400).json(
            {
                error : error.details[0].message
            });

        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).json(
            {
                error :"Invalid user."
            });

        const query = await Query.findById(req.params.id);
        if (!query) return res.status(400).json(
            {
                error : "The Query with the given ID was not found."
            });

        if(query.author._id != req.user._id){
            return res.status(401).json(
                {
                    error :"access denied."
                });
        }
        
        await Query.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            author: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            data : req.body.data,
            tags: req.body.tags

        }, {new: true});
        res.json(
            {
                error :"updated successfully"
            });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "something went wrong try after some time!", 
        });
    }
})

//user can delete his/her query
router.delete("/delete/:id", auth, async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).json(
        {
            error :"Invalid user."
        });

    const query = await Query.findById(req.params.id);

    if (!query) return res.status(404).json(
        {
            error :"The query with the given ID was not found."
        });

    if(query.author._id != req.user._id){
        return res.status(401).json(
            {
                error :"access denied."
            });
    }

    await Query.findByIdAndRemove(req.params.id);
    
    res.json(
        {
            message :"query deleted successfully"
        });
}
catch(ex){
    console.error(ex);
    res.status(500).json({
        error: "deletion failed, try after some time!", 
    });
}

});

module.exports = router;