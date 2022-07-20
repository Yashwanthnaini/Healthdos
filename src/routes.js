const home = require("../routes/Home/home");
const users = require("../routes/Users/users");
const experts = require("../routes/Experts/experts");
const search = require("../routes/Search/search");
const posts = require("../routes/Posts/posts");
const tags = require("../routes/Tags/tags");
const feedbacks = require("../routes/Feedbacks/feedbacks");
const queries = require("../routes/Queries/queries");
const solutions = require("../routes/Solutions/solutions");
const cors = require('cors');
const express = require ("express");

module.exports = function (app) {
    app.use(express.json());//body parser
    app.use(express.urlencoded({extended: true}));//for html forms
    app.use(express.static('public'));//to load html files
    app.use(cors());

    app.use("/", home);

    //for general users 
    app.use("/api/users", users);

    //for experts
    app.use("/api/experts", experts);

    //search option
    app.use("/api/search", search);

    //for experts to publish common details
    app.use("/api/posts",posts);

    //tags to filter or searching 
    app.use("/api/tags",tags);

    //feedbacks written by users viewed by expeters
    app.use("/api/feedbacks", feedbacks);

    //queries written by users and viewed by queries
    app.use("/api/queries", queries);

    //solutions written by experts and seen by users
    app.use("/api/solutions",solutions);

}