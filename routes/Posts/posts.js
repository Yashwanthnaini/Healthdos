const {Post,validatePost} = require("../../models/Post/postModel");
const {Feedback} = require("../../models/Feedback/feedbackModel");
const expertAuth = require("../../middleware/expertAuth");
const {Expert} = require("../../models/Expert/expertModel");
const express = require("express");
const router = express.Router();

router.get("/get/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                message : "This post doesn't exist"
            })
        }
        const feedbacks = await Feedback
                                    .find({"post._id":post._id})
                                    .select("comment author.name author._id")
        res.json({
            post : post,
            feedbacks : feedbacks
        })
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "post fetching went wrong try after some time!", 
        });
    }
})

//to get every posts in the database
router.get("/get/:pagesize/:pagenum", async(req,res)=>{
    const pagesize = req.params.pagesize
    const pagenum = req.params.pagenum
    try{
        const posts = await Post
                            .find()
                            .sort("-date")
                            .select("_id title data author.name tags date")
                            .skip(pagesize*(pagenum-1))
                            .limit(pagesize);
        if(!posts){
            return res.json({
                message : "No posts found"
            })
        }
        const count = await Post.countDocuments({});
        res.json({
            posts : posts,
            totalPosts : count
        });                    
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "something went wrong try after some time!", 
        });
    }
});

//to get the posts published by loged in expert
router.get("/get/myposts/:pagesize/:pagenum", expertAuth, async(req,res)=>{
    const pagesize = req.params.pagesize
    const pagenum = req.params.pagenum
    try{
        const posts = await Post
                            .find({"author._id" : req.expert._id})
                            .sort("-date")
                            .select("_id title data author.name tags date")
                            .skip(pagesize*(pagenum-1))
                            .limit(pagesize);
        if(!posts){
            return res.json({
                message : "No posts found",
                totalPosts : 0
            })
        }
        const count = await Post.countDocuments({"author._id" : req.expert._id});
        res.json({
            posts : posts,
            totalPosts : count
        });                    
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "something went wrong try after some time!", 
        });
    }
});


//to publish a post by the loged in expert
router.post("/add", expertAuth, async(req, res)=>{
    try{
        const {error} = validatePost(req.body);
         if (error) return res.status(400).json(
            {
                error : error.details[0].message
            });

        const expert = await Expert.findById(req.expert._id);
        if (!expert) return res.status(400).json({
            error : "Invalid user."
        });

        const post = new Post({
            title: req.body.title,
            author: {
                _id: expert._id,
                name: expert.name,
                email: expert.email
            },
            data : req.body.data,
            tags : req.body.tags
        });
        await post.save();
        res.json({
            message : "published successfully"
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "publishment went wrong try after some time!", 
        });
    }
});

//expert can update their posts 
router.put("/update/:id", expertAuth, async (req, res) => {
    try{
        const {error} = validatePost(req.body);
         if (error) return res.status(400).json(
            {
                error : error.details[0].message
            });

        const expert = await Expert.findById(req.expert._id);
        if (!expert) return res.status(400).json({
            error : "Invalid user."
        });

        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json(
            {
                error : "The post with the given ID was not found."
            });

        if(post.author._id != req.expert._id){
            return res.status(401).json(
                {
                    error : "access denied."
                });
        }
        
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            author: {
                _id: expert._id,
                name: expert.name,
                email: expert.email
            },
            data : req.body.data,
            tags:req.body.tags

        }, {new: true});
        res.json({
            message : "updated successfully"
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "update failed, try after some time!", 
        });
    }
})


//expert can delete their post
router.delete("/delete/:id", expertAuth, async (req, res) => {
    const post = await Post.findById(req.params.id);

    if(!post) return res.status(404).json(
        {
            error : "The post with the given ID was not found."
        });

    if(post.author._id != req.expert._id){
        return res.status(401).json(
            {
                error : "access denied."
            });
    }
    await Post.findByIdAndRemove(req.params.id);
    res.json(
        {
            message : "post deleted successfully"
        });
});


module.exports = router;