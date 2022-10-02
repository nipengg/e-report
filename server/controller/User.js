const { User } = require('../models')
const bcrypt = require("bcrypt");
const Validator = require('fastest-validator')

const v = new Validator({
    messages: {
        unique: "Email is already exist"
    }
})

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json({ data: users })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const register = async (req, res) => {

    const { name, email, password, confirmPassword } = req.body

    if (password != confirmPassword) {
        return res.status(400).json({ message: "Password does not match" })
    }

    const salt = await bcrypt.genSalt()

    const newPassword = password.toString();

    const hash = await bcrypt.hash(newPassword, salt)

    try {
        const schema = {
            name: { type: "string", min: 3, max: 255 },
            email: { type: "string", max: 255, unique: true },
            password: { type: "string", max: 255 },
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({ validator: validate })
        }

        const checkUser = await User.findAll({
            where: { email: email },
            attributes: ['id']
        })

        if (checkUser.length) {
            return res.status(400).json({ validator: "Email already exist." })
        }

        await User.create({
            name: name,
            email: email,
            password: hash,
        })

        res.json({ message: 'Register Success!' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getUsers, register }