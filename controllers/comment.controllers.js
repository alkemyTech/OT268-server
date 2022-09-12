const { Comment } = require("../models");

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
    uploadComment
}