var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getCourse, createCourse, editCourse } = require('../controller/courses')

router.get('/', verifyToken, getCourse)
router.post('/', createCourse)
router.put('/', editCourse)

module.exports = router;