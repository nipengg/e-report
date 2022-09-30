var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(process.env.APP_NAME);
});

router.get('/json', function(req, res, next) {
  res.json({
    nim: 2540121700,
    name: 'Neville'
  })
})

module.exports = router;
