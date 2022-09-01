const models = require('../models');
const { Slides } = models
const { NotFoundError } = require('../commons/errors');

// Listado de Slides con img y orden 

const getListSlide = async (req, res) => {

    let listSlide = {};

    try {
        listSlide = await Slides.findAll({
            attributes: ["text","imageURL","order"]
        });
        res.json(listSlide)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    };
}







module.exports = {
    getListSlide
}