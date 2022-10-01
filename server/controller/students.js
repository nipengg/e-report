const { Student, City, Class } = require('../models')
const Validator = require('fastest-validator')

const v = new Validator()

const getStudent = async (req, res) => {
    try {
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
        return res.json({ data: students })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getStudent }