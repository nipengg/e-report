var express = require('express')
var router = express.Router()
const Validator = require('fastest-validator')
const { Class } = require('../models')

const v = new Validator()

router.get('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const classes = await Class.findAll();
    return res.json({data: classes})
})

module.exports = router;