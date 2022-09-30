var express = require('express')
var router = express.Router()
const Validator = require('fastest-validator')
const { Course, Lecturer } = require('../models')

const v = new Validator()

router.get('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const courses = await Course.findAll({
        include: [{
            model: Lecturer,
            as: 'lecturer',
        }],
    });
    return res.json({data: courses})
})

module.exports = router;