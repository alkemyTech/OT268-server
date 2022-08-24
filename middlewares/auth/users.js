const jwt = require('jsonwebtoken')
// importo configuracion token (pablo covijo)

/******************************************

    Middleware User Admin 
    
******************************************/

const AuthUser = async (req, res, next) => {

    try {
        // Mensaje de error param id != token user id
        if (!req.headers.authorization) {
            res.status(403).json({ message: "Authentication failed! Ivalid token" });
            return;
        }
        //comprueba la validez del token con el ID del user
        const token = req.headers.authorization.split(" ").pop();
        const tokenUser = await verifyToken(token);

        if (!tokenUser.id) {
            res.status(403).json({ message: "Authentication failed! Invalid Token - User not found" });
        }
        else {
            next();
            console.log(decoded) //veo el usario sacar luego, consultar por winston 
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