const db = require('../models/index');
const Slides = require('../models/slides')(db.sequelize, db.Sequelize.DataTypes);



const getAllSlides =  async (req,res) =>{
    const id = req.params.organization_id;
    Slides.findAll({ where: {organizationId:id}, order: [['order', 'ASC'],]}).then(response =>   
         res.status(200).send(response)
         ).catch(err => {
            res.status(500).send(err);
        });
}

module.exports = {
    getAllSlides,
  };