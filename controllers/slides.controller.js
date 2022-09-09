const db = require('../models/index');
const Slides = require('../models/slides')(db.sequelize, db.Sequelize.DataTypes);
// image Upload
const multer = require('multer')
const path = require('path')
var fs = require('fs');
const DecodingImage = require('../helpers/imageDecode');


const updateSlides = (req, res) => {

    let upData = {};
    req.body.text !== "" ? (upData.text = req.body.text) : "";
    req.body.imageUrl !== "" ? (upData.imageUrl = req.body.imageUrl) : "";
    req.body.order !== "" ? (upData.order = req.body.order) : "";

    Slides.update(upData, { where: { id: req.params.id } }).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send(err);
    })

}

const getAllSlides = async (req, res) => {
    const id = req.params.organization_id;
    Slides.findAll({ where: { organizationId: id }, order: [['order', 'ASC'],] }).then(response =>
        res.status(200).send(response)
    ).catch(err => {
        res.status(500).send(err);
    });
}

const deleteByIdSlides = (req, res) => {

    Slides.destroy({ where: { id: req.params.id } }).then(response => {
        res.sendStatus(200).send(response);
    }).catch(err => {
        res.status(500).send(err);
    })

}
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

//Obtener Slide por ID

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

//Crear Slide

const creationSlide = async (req, res, next) => {

    const { imageBase64, text, order } = req.body;
    let slide;
    let imageUrl 
    try {
        imageUrl = await DecodingImage.decoding(imageBase64);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    };

    try {
        slide = await Slides.create({
            imageUrl,
            text,
            order
        });
        res.json(slide)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    };

}
const upload = async (req, res) => {
    if (req.file.filename) {
        res.status(201).json({
            mesaage: "Image upload successfully",
            url: req.file.filename
        });
    } else {
        res.status(500).json({
            mesaage: "Something went wrong!"
        });
    }
}


module.exports = {
    getAllSlides,
    updateSlides,
    deleteByIdSlides,
    getSlideList,
    getSlideById,
    creationSlide,
    upload
};






