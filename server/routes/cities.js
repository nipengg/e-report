var express = require('express')
var router = express.Router()
const Validator = require('fastest-validator')
const { City } = require('../models')

const v = new Validator()

router.get('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const cities = await City.findAll();
    return res.json({data: cities})
})

module.exports = router;