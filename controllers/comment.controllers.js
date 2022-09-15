const { Comment, Role } = require("../models");
const jwt = require('jsonwebtoken');


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

const deleteComment = async (req, res) =>{

  const {id} = req.params
  const comment = await Comment.findByPk(id).catch(err => {return res.status(500).send(err)})
  if(!comment) return res.status(404).json({status: 404, ok: false, error: "comment not found"})
  const {authorization} = req.headers
  try {        
    if (!authorization) {
        return res.status(403).json({ message: "Authentication failed! Invalid token" });
        }
    const token = authorization.split(" ").pop();
    const tokenUser = await verifyToken(token, process.env.JWT_SECRET)
    const role = await Role.findByPk(tokenUser.roleId).catch(err => {return res.status(500).send(err)})
    if (!tokenUser.id || tokenUser.id != comment.userId && role !== 'Admin') {
      return res.status(403).json({ message: "Authentication failed! Invalid Token - User not found" });
    }
    await comment.destroy()
    return res.status(200).json({status: 200, ok: true, message: "comment succesfully deleted"})
    } catch(err) {
        return res.status(500).send(err)}
}

module.exports = {
    uploadComment,
    deleteComment
}