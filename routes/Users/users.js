const {User, validateUser, validateLogin, validateUserEmail, validateUserPassword} = require("../../models/User/userModel");
const auth = require("../../middleware/authorization");
const emailVerify = require("../../middleware/emailVerify");
const resetVerify = require("../../middleware/resetVerify");
const sendEmail = require("../../resources/mailer");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

//to get user profile details of the loged in user
router.get("/get/me", auth ,async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password -__v -isExpert");
        if(!user){
            return res.json({
                error : "invalid token or invalid user"
            })
        }
        res.send(user);
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "User details fetching failed! try after some time", 
        });
    }
});


//to register a new user 
router.post("/register", async (req, res) => {
    try{
        const {error} = validateUser(req.body);
        if (error) return res.status(400).json({error : error.details[0].message});
        
        

        let user = await User.findOne({email: req.body.email});
        if (user) return res.status(400).json({
            error: "User with this email id already exists"
        });

        user = new User(_.pick(req.body, ["name", "email", "password"]));

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateVerifyToken();
        await sendEmail(user.email, token, user.name, "verify" ,"users");
        
        res.json({
            message: "User created successfully. Check your email for verification link"
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
router.get("/get/verify",auth,async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        const token = user.generateVerifyToken();
        await sendEmail(user.email, token, user.name,"verify","users");
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
        const user = await User.findById(req.user._id);
        if(!user){
            return res.redirect("http://localhost:3000/email/verify/invalid");
        }
        user.isVerified = true;
        await user.save();
        res.redirect("http://localhost:3000/email/verify");
    }
    catch(ex){
        console.error(ex);
        res.status(500).json({
            error: "verification failed! try after some time", 
        });
    }
});


//user login 
router.post("/login", async (req, res) => {
    try{
        const {error} = validateLogin(req.body);
        if (error) return res.status(400).json({error : error.details[0].message});

        let user = await User.findOne({email: req.body.email});
        if (!user) return res.status(400).json({
            error: "Invalid email or password"
        });
        if(!user.password) return res.status(400).json({
            error : "try login using google or use forgot password"
        });
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({
            error: "Invalid email or password",
        });
        
        const token = user.generateAuthToken();
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
        const {error} = validateUserEmail(req.body);
        if (error) return res.status(400).json({error : error.details[0].message});

        const email = req.body.email;
        const user = await User.findOne({email: email});
        if (!user) return res.status(400).json({
            error: "invalid user"
        });

        const token = user.generateResetToken();
        await sendEmail(user.email, token, user.name, "reset" ,"users");
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
router.post("/reset",auth,async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).json({
            error: "invalid user"
        });

        const token = user.generateResetToken();
        await sendEmail(user.email, token, user.name, "reset" , "users");
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
        const {error} = validateUserPassword(req.body);
        if (error) return res.status(400).json({error : error.details[0].message});
        
        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).json({
            error: "invalid user"
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();
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

//update user profile
router.put("/update",auth, async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).json({
            error: "invalid user"
        });

        await User.findByIdAndUpdate(req.user._id, {
            name: req.body.name,
            dob: req.body.dob,
            gender: req.body.gender,
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
