const db = require('../models/index');
const Slides = require('../models/slides')(db.sequelize, db.Sequelize.DataTypes);



const getAllSlides =  async (req,res) =>{
    const id = req.params.id;
    Slides.findAll({include:{model: organization, where: {organizationId:id}}}).then(response =>   
         res.status(200).send(response)
         ).catch(err => {
            res.status(500).send(err);
        });
}

module.exports = {
    getAllSlides,
  };