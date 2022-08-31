
const models = require('../models');
const { Activities } = models

/******************************
    OBTENER ACTIVIDAD POR ID
*******************************/

const getAtivityById = async (req, res) => {

    const { id } = req.params
    const activiti = await Activities.findByPk(id).catch(err => console.log(err))
    if (!activiti) return res.status(404).json({ ok: false })
    return res.status(200).json({ activiti })
}

/******************************
    OBTENER TODAS ACTIVIDADES 
*******************************/

const getAllActivities = async (req, res) => {

    const activities = await Activities.findAll().catch(err => console.log(err))
    if (!activities) return res.status(404).json({ ok: false })
    return res.status(200).json({ activities })
}

/******************************
    ELIMINAR ACTIVIDAD POR ID
*******************************/

const deleteActivity = async (req, res) => {

    const { id } = req.body
    if (!id) return res.status(400).send("no id found");

    const isDeleted = await Activities.destroy({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
    if (!isDeleted) return res.status(400).send(`Deletion failed Activity`).json({ ok: false })
    return res.status(200).json({ ok: false })

}

/******************************
    ?
*******************************/

const restoreActivity = async (req, res) => {

    const { id } = req.body
    if (!id) return res.status(404).send("no id found")
    const isRestored = await Activities.restore({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
    if (!isRestored) return res.status(400).send("restoring failed").json({ ok: false })
    return res.status(200).json({ ok: false })
}


/***********************************
    ACTUALIZAR ACTIVIDAD POR NOMBRE 
************************************/


const updateActivity = async (req, res) => {
    let activities = {};
    const { id } = req.params;
    const {
        name,
        content,
        image
    } = req.body;

    try {
        const article = await Activities.findOne({ where: { id } });
        activities = await article.update({
            name,
            content,
            image
        });
        res.json(activities)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    };
};

/******************************
    CREAR ACTIVIDAD 
*******************************/

const createActivity = async (req, res) => {
    let activities = {};
    const {
        name,
        content,
        image
    } = req.body;

    try {
        activities = await Activities.create({
            name,
            content,
            image
        });
        res.json(activities)
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });

    };
};


module.exports = {
    createActivity,
    updateActivity,
    restoreActivity,
    deleteActivity,
    getAllActivities,
    getAtivityById
};