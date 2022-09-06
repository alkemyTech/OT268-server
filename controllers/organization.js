const models = require('../models');
const { Organization } = models

//GET ALL *
async function getOrganization (req,res){
  let Organization = {};

  try {
      news = await Organization.findAll();
      res.json(Organization)
  } catch (error) {
      res.status(500).json({
          message: error.message,
      });

  };
}

// CREATE ORGANIZATION

async function createOrganization(req, res){

  const {newValues} = req.body
  const created = await Organization.create({...newValues}).catch(err => console.log(err))

  if(!created) return res.status(400).json({ok: false})

  return res.status(200).send(created)
}

// UPDATE ORGANIZATION
async function updateOrganization (req, res){

  const {id, newValues} = req.body
  const updated = await Organization.update({...newValues}, {where: {id: id}}).catch(err => console.log(err))
  if(!updated) return res.status(400).json({ok: false})
  return res.status(200).send(updated)
}

//DELETE ORGANIZATION
async function deleteOrganization(req, res) {

  const {id} = req.body
  if(!id) return res.status(400).send("no id found");

  const isDeleted = await Organization.destroy({
      where: {
          id: id
      }
  }).catch(err => console.log(err))
  if(!isDeleted) return res.status(400).send(`Deletion failed Organization`).json({ok: false})
  return res.status(200).json({ok: false})

}


module.exports = {
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization
}