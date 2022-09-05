const express = require('express');
const router = express.Router();
const organizationRoutes = require('./organizations');
const newsRoutes = require('./news')
const authRoutes = require('./auth')
const membersRoutes = require('./members')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use('/organization', organizationRoutes);
router.use('/news', newsRoutes);
router.use('/auth', authRoutes)
router.use('/members', membersRoutes)


module.exports = router;