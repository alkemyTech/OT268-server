const express = require('express');
const router = express.Router();
const { adminAuthentication } = require('../middlewares/adminAuth/userAdmin');

const { register } = require('../controllers/register.controller');

const {
  deleteUserByIdController,
  listUsersController,
} = require('../controllers/user');

/* GET users listing. */

// Only admin can access this endpoint
router.get('/', adminAuthentication, listUsersController);

router.delete('/:id', deleteUserByIdController);

router.post('/auth/register', register);

module.exports = router;
