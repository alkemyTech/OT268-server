const express = require('express');
const router = express.Router();
const organizationRoutes = require('./organizations');
const authRoutes = require('./auth');
const slidesRoutes = require('./slides');

const newsRoutes = require('./news')
const membersRoutes = require('./members')
const testimonialsRoutes = require('./testimonials');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/public/v2', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/organization', organizationRoutes);
router.use('/news', newsRoutes);
router.use('/auth', authRoutes)
router.use('slides', slidesRoutes)
router.use('/members', membersRoutes)
router.use('/testimonials', testimonialsRoutes);



module.exports = router;