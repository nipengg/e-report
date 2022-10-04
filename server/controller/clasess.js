const { Class } = require('../models')
const Validator = require('fastest-validator')

const v = new Validator()

const getClass = async (req, res) => {
    try {
        const classes = await Class.findAll();
        return res.json({ data: classes })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getClass }