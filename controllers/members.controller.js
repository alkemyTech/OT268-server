const {Member} = require ('../models/member.js')

async function getMemberById(req, res) {

    const {id} = req.params 
    const member = await Member.findByPk(id).catch(err => console.log(err))
    if(!member) return res.status(404).json( {ok: false})
    return res.status(200).json({member})
}

async function getAllMembers(req, res) { 
    
    const members = await Member.findAll().catch(err => {return res.status(500).send(err)})
    if(!members) return res.status(404).json( {ok: false})
    return res.status(200).json({ members})
}

async function deleteMember(req, res) {

    const {id} = req.params
    if(!id) return res.status(400).send("no id found")
    const member = await Member.findByPk(id).catch(err => {return res.status(500).send(err)})
    if(!member) return res.status(400).send("member doesn't exist")
    const isDeleted = await member.destroy().catch(err => {return res.status(500).send(err)})
    if(!isDeleted) return res.status(400).send("deletion failed").json({ok: false})
    return res.status(200).json({ok: true})

}

async function restoreMember(req, res){

    const {id} = req.body
    if(!id) return res.status(400).send("no id found")
    const isRestored = await Member.restore({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
    if(!isRestored) return res.status(400).send("restoring failed").json({ok: false})
    return res.status(200).json({ok: false})
}

async function updateMember(req, res){

    const {id, newValues} = req.body
    const updated = await Member.update({...newValues}, {where: {id: id}}).catch(err => console.log(err))
    if(!updated) return res.status(400).json({ok: false})
    return res.status(200).send(updated)
}

async function createMember(req, res){

    const {newMember} = req.body
    if(!newMember.name || typeof newMember.name != 'string') return res.status(400).send("name has to be a non-empty string")
    const created = await Member.create({...newValues}).catch(err => {return res.status(500).send(err)})
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
