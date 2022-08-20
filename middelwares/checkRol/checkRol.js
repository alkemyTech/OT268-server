const jwtDecode = require('jwt-decode');
const db = require('../models/index');
const Rol = require('../models/role')(db.sequelize, db.Sequelize.DataTypes);

module.exports = function checkRol(req, res, next){
    const tokenDecode = jwtDecode(req.headers['token']);
    Rol.findByPk(tokenDecode.roleId).then(item => {
        if(item.name == "Admin"){
            next();
        }else{
            res.sendStatus(401);
        }
    }).catch(err => {
        res.sendStatus(400);
    })
}