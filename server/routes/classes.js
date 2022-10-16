var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getClass, createClass } = require('../controller/clasess')

router.get('/', verifyToken, getClass)
router.post('/', createClass)

module.exports = router;