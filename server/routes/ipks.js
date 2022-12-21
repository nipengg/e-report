var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getIpk, createIpk, renderIPK } = require('../controller/ipks')

router.get('/', verifyToken, getIpk)
router.post('/', createIpk)
router.get('/semester', renderIPK)

module.exports = router;
