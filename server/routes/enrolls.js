var express = require('express')
var router = express.Router()
const { getEnroll, createEnroll } = require('../controller/enrolls')

router.get('/', getEnroll)
router.post('/', createEnroll)

module.exports = router;