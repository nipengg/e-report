const { Ipk, Student } = require('../models')
const Validator = require('fastest-validator')

const v = new Validator()

const getIpk = async (req, res) => {
    try {
        const ipk = await Ipk.findAll({
            include: [{
                model: Student,
                as: "student",
            }],
        })
        return res.json({ data: ipk })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getIpk }