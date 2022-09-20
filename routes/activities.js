const express = require('express');
const router = express.Router();
const {
  createActivity,
  updateActivity,
  deleteActivity,
  getAllActivities,
} = require('../controllers/activities.controller');
const { checkRol } = require('../middlewares/checkRol/checkRol');

router.get('/all', getAllActivities);
router.post('/', checkRol, createActivity);
router.put('/:id', checkRol, updateActivity);
router.delete('/:name', checkRol, deleteActivity);

module.exports = router;
