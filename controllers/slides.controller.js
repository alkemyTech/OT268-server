const db = require('../models/index');
const Slides = require('../models/slides')(db.sequelize, db.Sequelize.DataTypes);
const sequelize = require('sequelize');

// image Upload

const { uploadFile } = require('../services/aws/sss/file/index')
require('dotenv').config()
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION




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
    //Recibo la imagen a almacenar
    let {order, text} = req.body;
    imageUrl = req.file.originalname
    let slide;
    let imageName = req.file.fieldname
    let imageBuffer = req.file.buffer
    let imageMimetype = req.file.mimetype
    //Guardo la imagen en AWS - 
    try {
        json = await uploadFile(imageName, imageBuffer, imageUrl, imageMimetype);
    } catch (err) {
        return err.message;
    }
    //Creo la URL a guardar en BD
    try {
        imageUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/${imageName}-${imageUrl}`

        //Si no obtengo orden, genero uno en base al útlimo + 1

        if (!order) {
            listSlide = await Slides.findAll({
                order: [["order", "DESC"]],
                attributes: ["order"]
            });
            console.log(JSON.stringify(listSlide[1].order + 1))
            order = JSON.stringify(listSlide[1].order + 1)
        } 
        
        slide = await Slides.create({
            order,
            imageUrl,
            text
        });
        res.json(slide)

        // Guardo en DataBase

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    };
}



module.exports = {
    getAllSlides,
    updateSlides,
    deleteByIdSlides,
    getSlideList,
    getSlideById,
    creationSlide
};






