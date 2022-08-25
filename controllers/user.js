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

module.exports = {
  deleteUserByIdController,
};
