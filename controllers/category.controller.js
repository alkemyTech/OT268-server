
const db = require('../models/index');

const Category = require('../models/category')(db.sequelize, db.Sequelize.DataTypes);
const Prueba = "Category";

exports.get =  async (req,res) =>{
    Category.findAll().then(response =>   
         res.status(200).send(response)
         ).catch(err => {
            res.status(500).send(err);
        });
}

exports.create = (req, res) => {
    console.log("llego Create ", Prueba);
    const category = {};
    category.name = req.body.name;
    category.description = req.body.description;
    category.image= req.body.image;

    Category.create(category).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send(err);
    });
    // res.json({ok: true,
    //     mensaje: `Estamos en Create ${Prueba}`})

}

exports.getById =  (req,res) =>{

    console.log("llego GetById ", Prueba);
    Category.findByPk(req.params.id).then(response => {
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send(err);
    })

    // res.json({ok: true,
    //     mensaje: `Estamos en GetById ${Prueba}`})
}

exports.update =  (req,res) =>{
    console.log("llego Update ", Prueba);

    let upData = {};
    req.body.name !== "" ? (upData.name = req.body.name) : "";
    req.body.image !== "" ? (upData.image = req.body.image) : "";
    req.body.description !== "" ? (upData.description = req.body.description) : "";

    Category.update(upData, {where: {id: req.params.id}}).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send(err);
    })
    // res.json({ok: true,
    //     mensaje: `Estamos en Update ${Prueba}`})
}

exports.deleteById =  (req,res) =>{

    console.log("llego DeleteById ", Prueba)
    Category.destroy({where: {id: req.params.id}}).then(response => {
        res.sendStatus(200).send(response);
    }).catch(err =>{
        res.status(500).send(err);
    })
    // res.json({ok: true,
    //        mensaje: `Estamos en DeleteById ${Prueba}`})
}
