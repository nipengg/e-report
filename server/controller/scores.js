const { Score, Student, Course } = require('../models')
const Validator = require('fastest-validator')

const v = new Validator()

const getScore = async (req, res) => {
    try {
        const scores = await Score.findAll({
            include: [{
                model: Student,
                as: "student",
            },
            {
                model: Course,
                as: "course"
            }],
        })
        return res.json({ data: scores })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getScore }