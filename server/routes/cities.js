var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getCity, createCity } = require('../controller/cities')

router.get('/', verifyToken, getCity)
router.post('/', verifyToken, createCity)

module.exports = router;