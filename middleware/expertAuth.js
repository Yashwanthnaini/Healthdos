const jwt = require("jsonwebtoken");

function expertAuth (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({
        error : "Access denied. No token provided."
    });

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.expert = decoded;
        if(!req.expert.isExpert) return res.status(403).json({
            error : "Forbidden."
        });
        next();
    } 
    catch (ex) {
        console.log(ex);
        res.status(400).json({
            error:"Invalid token"
        });
    }
}

module.exports = expertAuth;