const jwt = require("jsonwebtoken");

function resetVerify(req, res, next) {
    const token = req.params.token;
    
    if (!token) return res.status(401).send("Access denied. No token provided.");

    try {
        const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
        req.user = decoded;
        next();
    } 
    catch (ex) {
        res.status(400).send("Invalid token.");
    }
}

module.exports = resetVerify;