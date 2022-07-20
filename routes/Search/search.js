const {Post} = require("../../models/Post/postModel");
const {Query} = require ("../../models/Feedback/feedbackModel");
const expertAuth  = require ("../../middleware/expertAuth");
const express = require("express");
const router = express.Router();

router.get("/posts/:keyword", async(req, res)=>{
    try{ 
        const posts = await Post.find({$or:[{ title: { $regex: `${req.params.keyword}`,$options: 'i'}},{ tags: { $in: [`${req.params.keyword}`] }}]}).select("title _id tags");
        res.json({
            posts : posts
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "fetching posts failed, try after some time!", 
        });
    }
});


router.post("/posts/tags", async(req, res)=>{
    try{
        const posts = await Post.find({ tags: { $in: req.body.tags }}).select("title _id tags");
        res.json({
            posts : posts
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "fetching posts failed, try after some time!", 
        });
    }
});

router.post("/queries/tags", expertAuth, async(req, res)=>{
    try{
        const queries = await Query.find({ tags: { $in: req.body.tags[0] }}).select("title _id tags");
        res.json({
            queries : queries
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "fetching queries failed, try after some time!", 
        });
    }
});

module.exports = router;