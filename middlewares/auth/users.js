const jwt = require('jsonwebtoken')
// importo configuracion token (pablo covijo)

/**
 * Middleware de Ownership
 * protege endpints p/ usuario actual
 */

async function AuthUser(req, res, next) {

    try {
        // Mensaje de error param id != token user id
        if (!req.headers.authorization) {
            res.status(403).json({ message: "Acceso no autorizado" });
            return;
        }
        //comprueba la validez del token
        const token = req.headers.authorization.split(" ").pop();
        const tokenData = await verifyToken(token);

        if (!tokenData.id) {
            res.status(403).json({ message: "Acceso no autorizado" });
        }
        else {
            next();
            console.log(decoded) //veo el usario sacar luego, consultar por winston 
        }
    }
    catch (error) {
        res.status(403).json({
            message: 'Something went wrong'
        });
        console.log(error)
    }
}

module.exports = AuthUser;