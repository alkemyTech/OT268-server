const express = require('express');
const router = express.Router();
const organizationRoutes = require('./organizations');
const newsRoutes = require('./news')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.use('/organization', organizationRoutes);
router.use('/news', newsRoutes);



module.exports = router;