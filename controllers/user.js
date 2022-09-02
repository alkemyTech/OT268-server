const { NotFoundError } = require('../commons/errors');
const db = require('../models');
const { User } = db;

async function deleteUserByIdController(req, res, next) {
  try {
    const { id } = req.params;

    const userToDelete = await User.destroy({
      where: {
        id,
      },
    });

    if (!userToDelete) {
      throw new NotFoundError('No user found with that id');
    }

    return res.status(200).json({ message: 'succesfully deleted' });
  } catch (error) {
    next(error);
  }
}

async function updateUserController(req, res){

  const {id} = req.params
  const {newValues} = req.body
  if(!id) return res.status(404).send("user not found")
  const updatedUser = await Member.update({...newValues}, {where: {id: id}}).catch(err => {return res.status(500).send(err)})
  if(!updatedUser) return res.status(500).send("internal error")
  return res.status(200).send(updatedUser)

}


module.exports = {
  deleteUserByIdController,
  updateUserController
};
