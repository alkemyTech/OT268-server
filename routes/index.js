const express = require('express');
const router = express.Router();
const organizationRoutes = require('./organization');
const authRoutes = require('./auth')
const membersRoutes = require('./members')
const testimonialsRoutes = require('./testimonials');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use('/organization', organizationRoutes)
router.use('/auth', authRoutes)
router.use('/members', membersRoutes)
router.use('/testimonials', testimonialsRoutes);



module.exports = router;