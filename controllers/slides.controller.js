const db = require('../models/index');
const Slides = require('../models/slides')(db.sequelize, db.Sequelize.DataTypes);





const deleteByIdSlides =  (req,res) =>{

    Slides.destroy({where: {id: req.params.id}}).then(response => {
        res.sendStatus(200).send(response);
    }).catch(err =>{
        res.status(500).send(err);
    })
 
}

module.exports = {
   
    deleteByIdSlides
  };
  