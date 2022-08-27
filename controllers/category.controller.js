
const db = require('../models/index');

const Category = require('../models/category')(db.sequelize, db.Sequelize.DataTypes);

const get =  async (req,res) =>{
    Category.findAll({attributes: ["name"]}).then(response =>   
         res.status(200).send(response)
         ).catch(err => {
            res.status(500).send(err);
        });
}

const create = (req, res) => {
    const category = {};
    category.name = req.body.name;
    category.description = req.body.description;
    category.image= req.body.image;

    Category.create(category).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send(err);
    });

}

const getById =  (req,res) =>{

    Category.findByPk(req.params.id).then(response => {
        res.status(200).send(response);
    }).catch(err =>{
        res.status(404).send(err);
    })

}

const update =  (req,res) =>{

    let upData = {};
    req.body.name !== "" ? (upData.name = req.body.name) : "";
    req.body.image !== "" ? (upData.image = req.body.image) : "";
    req.body.description !== "" ? (upData.description = req.body.description) : "";

    Category.update(upData, {where: {id: req.params.id}}).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send(err);
    })

}

const deleteById =  (req,res) =>{

    Category.destroy({where: {id: req.params.id}}).then(response => {
        res.sendStatus(200).send(response);
    }).catch(err =>{
        res.status(500).send(err);
    })
 
}


module.exports = {
    get,
    create,
    getById,
    update,
    deleteById,
  };
  