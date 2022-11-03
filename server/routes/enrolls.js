var express = require('express')
var router = express.Router()
const { getEnroll, createEnroll, createStudentEnroll } = require('../controller/enrolls')

router.get('/', getEnroll)
router.get('/c/student', createStudentEnroll)
router.post('/', createEnroll)

module.exports = router;