var express = require('express')
var router = express.Router()
const { getIpk, createIpk } = require('../controller/ipks')

router.get('/', getIpk)
router.post('/', createIpk)

module.exports = router;
