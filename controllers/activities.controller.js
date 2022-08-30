const {Activities} = require ('../models/activities');

class ActivitiesController {

constructor() { }

async getAtivityById(req, res) {

    const {id} = req.params 
    const activiti = await Activities.findByPk(id).catch(err => console.log(err))
    if(!activiti) return res.status(404).json( {ok: false})
    return res.status(200).json({activiti})
}

async  getAllActivities(req, res) { 
    
    const activities = await Activities.findAll().catch(err => console.log(err))
    if(!activities) return res.status(404).json( {ok: false})
    return res.status(200).json({ activities})
}

async  deleteActivity(req, res) {

    const {id} = req.body
    if(!id) return res.status(400).send("no id found");

    const isDeleted = await Activities.destroy({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
    if(!isDeleted) return res.status(400).send(`Deletion failed Activity`).json({ok: false})
    return res.status(200).json({ok: false})

}

async  restoreActivity(req, res){

    const {id} = req.body
    if(!id) return res.status(404).send("no id found")
    const isRestored = await Activities.restore({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
    if(!isRestored) return res.status(400).send("restoring failed").json({ok: false})
    return res.status(200).json({ok: false})
}

async  updateActivity(req, res){

    const {id, newValues} = req.body
    const updated = await Activities.update({...newValues}, {where: {id: id}}).catch(err => console.log(err))
    if(!updated) return res.status(400).json({ok: false})
    return res.status(200).send(updated)
}

createActivity = async (req, res) => {
    try {
        const { name, content } = req.body;
        const addActivity = {
            name,
            content,
        };
        if (name && content) {
            const activitySave = await Activities.create(addActivity);
            return res.status(201).json({
                msg: "Activity created",
                activitySave
            });
        } else {
            return res.status(404).json({
                msg: "Field name or content not found",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "insuccessful creation",
            error
        });
    }
};
}
module.exports = { ActivitiesController };