const { Lecturer } = require('../models')
const Validator = require('fastest-validator')

const v = new Validator()

const getLecturer = async (req, res) => {
    try {
        const lecturers = await Lecturer.findAll();
        return res.json({ data: lecturers })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const postLecturer = async (req, res) => {
    try {
        const schema = {
            lecturer_name: 'string|required',
            address: 'string|required',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json(validate)
        }

        res.send('ok')
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getLecturer, postLecturer }