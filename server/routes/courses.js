var express = require('express')
var router = express.Router()
const { getCourse } = require('../controller/courses')

router.get('/', getCourse)

module.exports = router;