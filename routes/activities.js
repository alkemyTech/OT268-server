const express = require("express");
const router = express.Router()

const  activities  = require('../controllers/activities.controller')


router.post('/' , activities.createActivity)
router.put('/:id', activities.updateActivity)

module.exports = router

