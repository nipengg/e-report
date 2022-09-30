var express = require('express')
var router = express.Router()
const Validator = require('fastest-validator')
const { Student, City, Class } = require('../models')

const v = new Validator()

router.get('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const students = await Student.findAll({
        include: [{
            model: City,
            as: "city",
        },
        {
            model: Class,
            as: "class"
        }],
    })
    return res.json({data: students})
})


module.exports = router;