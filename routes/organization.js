var express = require('express');
var router = express.Router();


router.get('/public', function(req, res, next) {
  res.json({
        name: 'Somos Más',
        image: 'https://drive.google.com/drive/u/0/folders/1q-t5pTX3FA7bf-2kDnGq-99EUfkUQ7iZ',
        phone: '1160112988',
        address: ''
  });
});

module.exports = router;
