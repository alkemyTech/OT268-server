const express = require('express');
const router = express.Router();
const { 
    createActivity,
    updateActivity,
    deleteActivity,
    getAllActivities 
} = require('../controllers/activities.controller');


router.get('/all', getAllActivities);

router.post('/', createActivity)

router.put('/:id', updateActivity);

router.delete('/:name', deleteActivity);


module.exports = router;
