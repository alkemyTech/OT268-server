const jwtDecode = require('jwt-decode');
const db = require('../../models/index');
const Rol = require('../../models/role')(db.sequelize, db.Sequelize.DataTypes);


const checkRol = (req, res, next) => {
    
    const tokenDecode = jwtDecode(req.headers['token']);

    Rol.findByPk(tokenDecode.user_roleId).then(item => {
        if(item.name == "Admin"){
            next();
        }else{
            res.sendStatus(401).json({ok: false, message: "Not authorized"});
        }
    }).catch(err => {
        res.sendStatus(400).json({ok:false, message: "Bad request"});
    })
}






//   try {
//     const tokenDecode = jwtDecode(req.headers["token"]);
//     console.log(tokenDecode)

//     const rol = await Rol.findOne({where: {
//         id: tokenDecode.user_roleId,
        
//       }});
//     console.log(rol, "rol")

//     if (rol.name === "Admin") {
//         next()
//     }
//     else {
//       res.sendStatus(401).json({ ok: false, message: "Not authorized" });
//     }
//   } catch (error) {
//     res.send(error);
//   }

module.exports = {
    checkRol,
}