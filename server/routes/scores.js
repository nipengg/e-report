var express = require('express')
var router = express.Router()
const { getScore } = require('../controller/scores')

router.get('/', getScore)

module.exports = router;