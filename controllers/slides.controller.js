const models = require('../models');
const { Slides } = models
const { NotFoundError } = require('../commons/errors');

// Listado de Slides con img y orden 

const getSlideList = async (req, res) => {

    let listSlide = {};

    try {
        listSlide = await Slides.findAll({
            attributes: ["text", "imageURL", "order"]
        });
        res.json(listSlide)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    };
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
    getSlideList,
    getSlideById
}