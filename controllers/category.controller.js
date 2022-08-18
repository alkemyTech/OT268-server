
const db = require('../models/index');

const Category = require('../models/category')(db.sequelize, db.Sequelize.DataTypes);
const Prueba = "Category";

exports.get =  async (req,res) =>{
    Category.findAll().then(response =>   
         res.status(200).send(response));
}

exports.create = (req, res) => {
    console.log("llego Create ", Prueba)
    db.models.Area.create()
    res.json({ok: true,
        mensaje: `Estamos en Create ${Prueba}`})

}

exports.getById =  (req,res) =>{

    console.log("llego GetById ", Prueba)
    res.json({ok: true,
        mensaje: `Estamos en GetById ${Prueba}`})
}

exports.update =  (req,res) =>{

    console.log("llego Update ", Prueba)
    res.json({ok: true,
        mensaje: `Estamos en Update ${Prueba}`})
}

exports.deleteById =  (req,res) =>{

    console.log("llego DeleteById ", Prueba)
    res.json({ok: true,
        mensaje: `Estamos en DeleteById ${Prueba}`})
}
