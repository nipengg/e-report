var express = require('express')
var router = express.Router()
const { getStudent } = require('../controller/students')

router.get('/', getStudent)

module.exports = router;