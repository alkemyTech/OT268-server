const db = require('../models/index');

const getAllComments =  async (req,res) =>{
    Comment.findAll({attributes: ["body"], order: [["createdAt", "ASC"],]}).then(response =>   
         res.status(200).send(response)
         ).catch(err => {
            res.status(500).send(err);
        });
}


module.exports = {
    getAllComments,
  };
  