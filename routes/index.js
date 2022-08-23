var express = require('express');
var router = express.Router();
const organizationRoutes = require('./organization')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/organization', organizationRoutes)

module.exports = router;
