const jwt = require("jsonwebtoken");

// Middleware to authenticate using JWT
const authToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({success:false,msg:'Access denied. No token provided.'});

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({success:false,msg:'Invalid token.'});
    }
};

module.exports = {
    authToken
}