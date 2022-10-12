var express = require('express')
var router = express.Router()
const { getEnroll } = require('../controller/enrolls')

router.get('/', getEnroll)

module.exports = router;