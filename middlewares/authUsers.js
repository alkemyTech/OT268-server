const jwt = require('jsonwebtoken')

/******************************************

    Middleware authenticated user
    
******************************************/

const AuthUser = async (req, res, next) => {

    try {
        
        if (!req.headers.authorization) {
            res.status(403).json({ message: "Authentication failed! Invalid token" });
            return;
        }
        
        const token = req.headers.authorization.split(" ").pop();
        const tokenUser = await verifyToken(token);

        if (!tokenUser.id) {
            res.status(403).json({ message: "Authentication failed! Invalid Token - User not found" });
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(403).json({
            message: 'Authentication failed! Token required'
        });
        console.log(error)
    }
}

module.exports = AuthUser;