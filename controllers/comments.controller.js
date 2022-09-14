const db = require('../models/index');
const { Comment } = require("../models");

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

const uploadComment = async (req, res) => {
    const { userId, body, newsId } = req.body;
  
    try {
      const comment = await Comment.create({
          userId,
          body,
          newsId,
        });
      
        res.status(200).send(comment)
    } catch (error) {
      res.status(404).send("ups something went wrong....try again")
    }
  };

module.exports = {
    getAllComments,
    uploadComment,
    getCommentsByPostId
};
  