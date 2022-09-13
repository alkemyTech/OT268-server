const db = require('../models/index');

const getAllComments =  async (req,res) =>{
    Comment.findAll({attributes: ["body"], order: [["createdAt", "ASC"],]}).then(response =>   
         res.status(200).send(response)
         ).catch(err => {
            res.status(500).send(err);
        });
}

const getCommentsByPostId =  async (req,res) =>{
    Comment.findAll({attributes: ["body"], where: {newsId: req.params.id}, order: [["createdAt", "ASC"],]}).then(response =>
            res.status(200).send(response)
        ).catch(err => {
            res.status(500).send(err);
        });
}

module.exports = {
    getAllComments,
    getCommentsByPostId
  };
  