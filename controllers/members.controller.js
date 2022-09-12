const models = require('../models');
const { Members } = models
async function getMemberById(req, res) {

    const {id} = req.params 
    const member = await Members.findByPk(id).catch(err => console.log(err))
    if(!member) return res.status(404).json( {ok: false})
    return res.status(200).json({member})
}

async function getAllMembers(req, res) { 
    
    const members = await Members.findAll({}).catch(err => {return res.status(500).send(err)})
    if(!members.length) return res.status(404).json( { status: 404, ok: false})
    return res.status(200).json({ members})
}

async function deleteMember(req, res) {

    const {id} = req.params
    if(!id) return res.status(400).send("no id found")
    const member = await Members.findByPk(id).catch(err => {return res.status(500).send(err)})
    if(!member) return res.status(400).send("member doesn't exist")
    const isDeleted = await member.destroy().catch(err => {return res.status(500).send(err)})
    if(!isDeleted) return res.status(400).send("deletion failed").json({ok: false})
    return res.status(200).json({ok: true})

}

async function restoreMember(req, res){

    const {id} = req.body
    if(!id) return res.status(400).send("no id found")
    const isRestored = await Members.restore({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
    if(!isRestored) return res.status(400).send("restoring failed").json({ok: false})
    return res.status(200).json({ok: false})
}

async function updateMember(req, res){

    const {id} = req.params
    const {newValues} = req.body
    if(!id || !newValues) return res.status(400).json({status: 400, ok: false, error: "missing data. Check documentation"})
    const member = await Members.findByPk(id).catch(err => {return res.status(500).send(err)})
    if(!member) return res.status(404).json({status: 404, ok: false, error: "user not found. Check id"})
    const updated = await member.update({...newValues}).catch(err => {return res.status(500).send(err)})
    const saved = await member.save().catch(err => {return res.status(500).send(err)})
    if(!updated || !saved) return res.status(400).json({status: 400, ok: false})
    return res.status(200).send(updated)
}

async function createMember(req, res){

    const {newMember} = req.body
    if(!newMember.name || typeof newMember.name != 'string') return res.status(400).send("name has to be a non-empty string")
    const created = await Members.create({...newMember}).catch(err => {return res.status(500).send(err)})
    if(!created) return res.status(400).json({ok: false})
    return res.status(200).send(created)
}

module.exports = {

    getAllMembers,
    getMemberById,
    deleteMember,
    restoreMember,
    updateMember,
    createMember

}
