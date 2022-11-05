var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getScore, createScore, getStudentScores, updateScore } = require('../controller/scores')

router.get('/', verifyToken, getScore)
router.get('/s/student', getStudentScores)
router.post('/', createScore)
router.post('/update', updateScore)

module.exports = router;