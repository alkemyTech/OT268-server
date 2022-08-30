const { Activities } = require('../models/activities');

class ActivitiesController {

    constructor() { }

    async getAtivityById(req, res) {

        const { id } = req.params
        const activiti = await Activities.findByPk(id).catch(err => console.log(err))
        if (!activiti) return res.status(404).json({ ok: false })
        return res.status(200).json({ activiti })
    }

    async getAllActivities(req, res) {

        const activities = await Activities.findAll().catch(err => console.log(err))
        if (!activities) return res.status(404).json({ ok: false })
        return res.status(200).json({ activities })
    }

    async deleteActivity(req, res) {

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

    async restoreActivity(req, res) {

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

    async updateActivity(req, res) {
        try {
            const { id } = req.params;
            const { name, content } = req.body;

            const activitID = await Activities.findByPk(req.params.id);

            const updateActivity = {
                name,
                content,
            };

            if (activitID) {
                await Activities.update(updateActivity, { where: { id } });
                return res.status(201).json({
                    msg: "Activity created",
                    updateActivity
                });
            } else {
                return res.status(404).json({
                    msg: "Activity already exist",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Insuccessful update",
                error
            });
        }
    };

    async createActivity(req, res) {

        const { newValues } = req.body
        const created = await Activities.create({ ...newValues }).catch(err => console.log(err))
        if (!created) return res.status(400).json({ ok: false })
        return res.status(200).send(created)
    }
}
module.exports = new ActivitiesController ;