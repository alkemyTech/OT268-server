const express = require('express');
const { getAllMembers } = require('../controllers/members.controller');
const router = express.Router();

router.get('/', getAllMembers);

module.exports = router;
