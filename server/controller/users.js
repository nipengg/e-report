const { User } = require('../models')
const bcrypt = require("bcrypt");
const Validator = require('fastest-validator')
const jwt = require('jsonwebtoken')

const v = new Validator({
    messages: {
        unique: "Email is already exist"
    }
})

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email']
        });
        return res.json({ data: users })
    } catch (error) {
        return res.status(404).json({ message: error.message })
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

        return res.json({ message: 'Register Success!' })
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

const login = async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await User.findAll({
            where: { email: email }
        })

        const check = await bcrypt.compare(password, user[0].password)

        if (!check) {
            res.status(404).json({ message: "Wrong Password" })
        }

        const userId = user[0].id
        const name = user[0].name
        const emailUser = user[0].email

        const accessToken = jwt.sign({ userId, name, emailUser }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })

        const refreshToken = jwt.sign({ userId, name, emailUser }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        await User.update({
            refresh_token: refreshToken
        }, {
            where: { id: userId }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        return res.json({ accessToken })

    } catch (error) {
        return res.status(404).json({ message: "Email does not exist." })
    }
}

module.exports = { getUsers, register, login }