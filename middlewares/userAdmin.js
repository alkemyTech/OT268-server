const jwt = require('jsonwebtoken');
const models = require('../models');
const { Role } = models;


/*****************************************
    Middleware de Ownership
    protege endpints p/ usuario actual
 *****************************************/

const adminAuthentication = async  (req, res, next) => {
    //Verifico si recibo token con el usuario
    if (!req.headers.authorization) return res.json({ msg: 'Authentication failed! Token required' });
    const token = req.headers.authorization.split(' ')[1];

    try {
        //verifico el roleId
        const { roleId } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Role.findOne({ where: { id: roleId } });

        const { name } = user;
        //verifico que sea admin
        if (name !== 'Admin') 
        return res.json({ msg: 'Authentication failed! User without privileges' });

        next();
    } catch (error) {
        res.status(403).json({
            msg: `Authentication failed! ${error}`
        });
    }
};
module.exports = adminAuthentication;
// TO DO 
//JWT_SECRET -> CAMBIARLO POR EL NOMBRE QUE HAYAN PUESTO EN .ENV
//MODELO DE ROLES -> CAMBIAR ID SI FUERA NECESARIO 