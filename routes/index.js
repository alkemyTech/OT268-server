const express = require('express');
const router = express.Router();
const organizationRoutes = require('./organization');
const authRoutes = require('./auth');
const slidesRoutes = require('./slides');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use('/organization', organizationRoutes)
router.use('/auth', authRoutes)
router.use('slides', slidesRoutes)

module.exports = router;