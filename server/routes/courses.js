var express = require('express')
var router = express.Router()
const { getCourse, createCourse } = require('../controller/courses')

router.get('/', getCourse)
router.post('/', createCourse)

module.exports = router;