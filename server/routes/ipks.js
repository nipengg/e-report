var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getIpk, createIpk } = require('../controller/ipks')

router.get('/', verifyToken, getIpk)
router.post('/', createIpk)

module.exports = router;
