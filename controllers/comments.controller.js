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

  const updateComments = async (req, res) => {
    const { id } = req.params;
    const { userId, body, newsId } = req.body;
  
    try {
      const comment = await Comment.findOne({ where: { id } });
  
      if (!comment) throw res.status(404).send(`Id ${id} not found`);
  
      changes = await comment.update({
        userId,
        body,
        newsId,
      });
      return res.status(200).json(changes);
  
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    };
  }

module.exports = {
    getAllComments,
    uploadComment,
    getCommentsByPostId,
    updateComments
};
  