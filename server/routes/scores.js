var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getScore, createScore, getStudentScores } = require('../controller/scores')

router.get('/', verifyToken, getScore)
router.get('/s/student', getStudentScores)
router.post('/', createScore)

module.exports = router;