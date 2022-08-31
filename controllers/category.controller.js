
const db = require('../models/index');

const Category = require('../models/category')(db.sequelize, db.Sequelize.DataTypes);

const getAllCategory =  async (req,res) =>{
    Category.findAll({attributes: ["name"]}).then(response =>   
         res.status(200).send(response)
         ).catch(err => {
            res.status(500).send(err);
        });
}

const createCategory = (req, res) => {
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

const getByIdCategory =  (req,res) =>{

    Category.findByPk(req.params.id).then(response => {
        res.status(200).send(response);
    }).catch(err =>{
        res.status(500).send(err);
    })

}

const updateCategory =  (req,res) =>{

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

const deleteByIdCategory =  (req,res) =>{

    Category.destroy({where: {id: req.params.id}}).then(response => {
        res.sendStatus(200).send(response);
    }).catch(err =>{
        res.status(500).send(err);
    })
 
}


module.exports = {
    getAllCategory,
    createCategory,
    getByIdCategory,
    updateCategory,
    deleteByIdCategory,
  };
  