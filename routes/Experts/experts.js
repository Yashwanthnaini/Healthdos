const {Expert, validateExpert, validateLogin, validateExpertEmail, validateExpertPassword} = require("../../models/Expert/expertModel");
const expertAuth = require("../../middleware/expertAuth");
const emailVerify = require("../../middleware/emailVerify");
const resetVerify = require("../../middleware/resetVerify");
const sendEmail = require("../../resources/mailer");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

//to get Expert profile details of the loged in Expert
router.get("/get/me", expertAuth ,async (req, res) => {
    try{
        const expert = await Expert.findById(req.expert._id).select("-password -__v -isExpert");
        if(!expert){
            return res.json({
                error : "invalid token or invalid expert"
            })
        }
        res.send(expert);
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "Expert details fetching failed! try after some time", 
        });
    }
});


//to register a new expert
router.post("/register", async (req, res) => {
    try{
        const {error} = validateExpert(req.body);
         if (error) return res.status(400).json({error : error.details[0].message});
        

        let expert = await Expert.findOne({email: req.body.email});
        if (expert) return res.status(400).json({
            error: "Expert with this email id already exists"
        });

        expert = new Expert(_.pick(req.body, ["name", "email", "password"]));

        const salt = await bcrypt.genSalt(10);
        expert.password = await bcrypt.hash(expert.password, salt);
        await expert.save();

        const token = expert.generateVerifyToken();
        await sendEmail(expert.email, token, expert.name, "verify", "experts");
        
        res.json({
            message: "Account created successfully. Check your email for verification link"
        });
       
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "Registraion failed due to some unexpected reasons! try after sometime", 
        });
    }
    
});


//to get verification link to email
router.get("/get/verify", expertAuth, async (req, res) => {
    try{
        const expert = await Expert.findById(req.expert._id);
        const token = expert.generateVerifyToken();
        await sendEmail(expert.email, token, expert.name,"verify", "experts");
        res.json({
            message: "verification email sent successfully to your email"
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "failed to send verification email! try after some time",
        });
    }
});

//email vefication done
router.get("/verify/:token", emailVerify, async (req, res) => {
    try{
        const expert = await Expert.findById(req.expert._id);
        if(!expert){
            return res.redirect("https://askito.netlify.app/email/verify/invalid");
        }
        expert.isVerified = true;
        await expert.save();
        res.redirect("https://askito.netlify.app/email/verify");
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "verification failed! try after some time", 
        });
    }
});


//expert login 
router.post("/login", async (req, res) => {
    try{
        const {error} = validateLogin(req.body);
         if (error) return res.status(400).json({error : error.details[0].message});

        let expert = await Expert.findOne({email: req.body.email});
        if (!expert) return res.status(400).json({
            error: "Invalid email or password"
        });
        if(!expert.password) return res.status(400).json({
            error : "try login using google or use forgot password"
        });
        
        const validPassword = await bcrypt.compare(req.body.password, expert.password);
        if (!validPassword) return res.status(400).json({
            error: "Invalid email or password",
        });
        
        const token = expert.generateAuthToken();
        res.header('x-auth-token',token)
        .header("access-control-expose-headers", "x-auth-token")
        .json({
            message: "login successful",
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "Login failed try after some time!", 
        });
    }
    
});

//forgot password options
router.post("/forgot",async (req, res) => {
    try{
        const {error} = validateExpertEmail(req.body);
         if (error) return res.status(400).json({error : error.details[0].message});

        const email = req.body.email;
        const expert = await Expert.findOne({email: email});
        if (!expert) return res.status(400).json({
            error: "invalid expert"
        });

        const token = expert.generateResetToken();
        await sendEmail(expert.email, token, expert.name, "reset", "experts");
        res.json({
            message: "password reset email sent successfully to your email"
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "failed to send password reset email! try after some time",
        });
    }
});

//password reset link generation
router.post("/reset", expertAuth, async (req, res) => {
    try{
        const expert = await Expert.findById(req.expert._id);
        if (!expert) return res.status(400).json({
            error: "invalid expert"
        });

        const token = expert.generateResetToken();
        await sendEmail(expert.email, token, expert.name, "reset", "experts");
        res.json({
            message: "password reset email sent successfully to your email"
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "failed to send password reset email! try after some time",
        });
    }
});

//password reset
router.post("/reset/:token", resetVerify, async (req, res) => {
    try{
        const {error} = validateExpertPassword(req.body);
         if (error) return res.status(400).json({error : error.details[0].message});
        
        const expert = await Expert.findById(req.expert._id);
        if (!expert) return res.status(400).json({
            error: "invalid expert"
        });

        const salt = await bcrypt.genSalt(10);
        expert.password = await bcrypt.hash(req.body.password, salt);
        await expert.save();
        res.json({
            message: "password reset successfully"
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "something went wrong try after some time!", 
        });
    }
});

//update expert profile
router.put("/update", expertAuth, async (req, res) => {
    try{
        const expert = await Expert.findById(req.expert._id);
        if (!expert) return res.status(400).json({
            error: "invalid expert"
        });

        await Expert.findByIdAndUpdate(req.expert._id, {
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
            expertIn: req.body.expertIn,
            bio: req.body.bio,
            twitterUrl: req.body.twitterUrl,
            instagramUrl: req.body.instagramUrl,
            linkedInUrl : req.body.linkedInUrl,
            location: req.body.location
        }, {new: true});
        
        res.json({
            message : "updated successfully"
        });
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "update failed try after some time!", 
        });
    }

});

module.exports = router;
