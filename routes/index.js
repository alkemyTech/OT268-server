const express = require('express');
const router = express.Router();
const organizationRoutes = require('./organization');
const authRoutes = require('./auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use('/organization', organizationRoutes)
router.use('/auth', authRoutes)


module.exports = router;