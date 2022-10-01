var express = require('express')
var router = express.Router()
const { getCity } = require('../controller/cities')

router.get('/', getCity)

module.exports = router;