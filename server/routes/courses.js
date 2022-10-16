var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getCourse, createCourse } = require('../controller/courses')

router.get('/', verifyToken, getCourse)
router.post('/', createCourse)

module.exports = router;