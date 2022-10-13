var express = require('express')
var router = express.Router()
const { getScore, createScore } = require('../controller/scores')

router.get('/', getScore)
router.post('/', createScore)

module.exports = router;