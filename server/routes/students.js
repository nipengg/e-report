var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getStudent, createStudent, showStudent } = require('../controller/students')

router.get('/', verifyToken, getStudent)
router.get('/:name', showStudent)
router.post('/', createStudent)

module.exports = router;