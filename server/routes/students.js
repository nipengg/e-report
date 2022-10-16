var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getStudent, createStudent } = require('../controller/students')

router.get('/', verifyToken, getStudent)
router.post('/', createStudent)

module.exports = router;