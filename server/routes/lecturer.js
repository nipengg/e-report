var express = require('express')
var router = express.Router()
const Validator = require('fastest-validator')
const { Lecturer } = require('../models')

const v = new Validator()

// Get Lecture Data
router.get('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const lecturers = await Lecturer.findAll();
    return res.json({data: lecturers})
})

// Post Lecturer Data
router.post('/store', async (req, res) => {
    const schema = {
        lecturer_name: 'string|required',
        address: 'string|required',
    }

    const validate = v.validate(req.body, schema)

    if (validate.length) {
        return res.status(400).json(validate)
    }

    res.send('ok')
})

module.exports = router;