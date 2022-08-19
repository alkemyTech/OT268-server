var express = require('express');
var router = express.Router();
const db = require('../models')

// const { Role } = db.sequelize.models
/* GET users listing. */

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/', async (req, res ) =>  {
//   try {
//     const newRole = await Role.create({name: 'prueba'})
//     return res.json(newRole)
    
//   } catch (error) {
//     return res.status(400)
//   }
// })

module.exports = router;
