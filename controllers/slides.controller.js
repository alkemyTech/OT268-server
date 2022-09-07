const db = require('../models/index');
const Slides = require('../models/slides')(db.sequelize, db.Sequelize.DataTypes);


const updateSlides =  (req,res) =>{

    let upData = {};
    req.body.text !== "" ? (upData.text = req.body.text) : "";
    req.body.imageUrl !== "" ? (upData.imageUrl = req.body.imageUrl) : "";
    req.body.order !== "" ? (upData.order = req.body.order) : "";

    Slides.update(upData, {where: {id: req.params.id}}).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send(err);
    })

}
  
const getAllSlides =  async (req,res) =>{
    const id = req.params.organization_id;
    Slides.findAll({ where: {organizationId:id}, order: [['order', 'ASC'],]}).then(response =>   
         res.status(200).send(response)
         ).catch(err => {
            res.status(500).send(err);
        });
}

const deleteByIdSlides =  (req,res) =>{

    Slides.destroy({where: {id: req.params.id}}).then(response => {
        res.sendStatus(200).send(response);
    }).catch(err =>{
        res.status(500).send(err);
    })
 
}

const getSlideById = async (req, res) => {
    const { id } = req.params;
    let slide;
    try {
        slide = await Slides.findByPk(id);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    };
    if (!slide) {
        return res.status(404).json({ message: 'slide not found' });
    }
    return res.json(slide);
}




module.exports = {
    getAllSlides, 
    updateSlides,
    deleteByIdSlides,
    getSlideById
  };
  
