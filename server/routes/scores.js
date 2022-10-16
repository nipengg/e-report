var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getScore, createScore } = require('../controller/scores')

router.get('/', verifyToken, getScore)
router.post('/', createScore)

module.exports = router;