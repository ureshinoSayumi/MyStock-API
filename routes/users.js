var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('/users')
  // res.send('respond with a resource');
  res.status(200).json({
    "name": 'wir',
  })
});

module.exports = router;
