var express = require('express')
var router = express.Router()
const { getClass } = require('../controller/clasess')

router.get('/', getClass)

module.exports = router;