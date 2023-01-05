var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getClass, createClass, editClass } = require('../controller/clasess')

router.get('/', verifyToken, getClass)
router.post('/', createClass)
router.put('/', editClass)

module.exports = router;