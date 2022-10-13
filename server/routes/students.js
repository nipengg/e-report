var express = require('express')
var router = express.Router()
const { getStudent, createStudent } = require('../controller/students')

router.get('/', getStudent)
router.post('/', createStudent)

module.exports = router;