var express = require('express')
var router = express.Router()
const Validator = require('fastest-validator')
const { Ipk, Student } = require('../models')

const v = new Validator()

router.get('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const ipk = await Ipk.findAll({
        include: [{
            model: Student,
            as: "student",
        }],
    })
    return res.json({data: ipk})
})

module.exports = router;
