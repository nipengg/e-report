var express = require('express')
var router = express.Router()
const { getEnroll, createEnroll, createStudentEnroll, getStudentEnroll } = require('../controller/enrolls')

router.get('/', getEnroll)
router.get('/c/student', createStudentEnroll)
router.get('/e/student', getStudentEnroll)
router.post('/', createEnroll)

module.exports = router;