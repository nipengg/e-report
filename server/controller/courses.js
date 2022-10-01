const { Course, Lecturer } = require('../models')
const Validator = require('fastest-validator')

const v = new Validator()

const getCourse = async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "*")
        const courses = await Course.findAll({
            include: [{
                model: Lecturer,
                as: 'lecturer',
            }],
        });
        return res.json({ data: courses })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getCourse }