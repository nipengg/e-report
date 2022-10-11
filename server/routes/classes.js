var express = require('express')
var router = express.Router()
const { getClass, createClass } = require('../controller/clasess')

router.get('/', getClass)
router.post('/', createClass)

module.exports = router;