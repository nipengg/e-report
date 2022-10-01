var express = require('express')
var router = express.Router()
const { getIpk } = require('../controller/ipk')

router.get('/', getIpk)

module.exports = router;
