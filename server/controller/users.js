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
        res.header("Access-Control-Allow-Origin", "*")
        // Get all user by id, name, email
        const users = await User.findAll({
            attributes: ['id', 'name', 'email']
        });
        return res.json({ data: users })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

const register = async (req, res) => {

    res.header('Content-Type', 'application/json')
    res.header('Accept', 'application/json')
    res.header('Origin', process.env.CLIENT_HOSTNAME)

    // Get data from body
    const { name, email, password, confirmPassword } = req.body

    // Check password
    if (password != confirmPassword) {
        return res.status(400).json({ message: "Password does not match" })
    }

    // Bcrypt password
    const salt = await bcrypt.genSalt()

    const newPassword = password.toString();

    const hash = await bcrypt.hash(newPassword, salt)

    try {

        // Add schema validator for template validation
        const schema = {
            name: { type: "string", min: 3, max: 255 },
            email: { type: "string", max: 255, unique: true },
            password: { type: "string", max: 255 },
        }

        // Validate the data
        const validate = v.validate(req.body, schema)

        // Check if data is validated
        if (validate.length) {
            return res.status(400).json({ validator: validate })
        }

        // Check user with the input email
        const checkUser = await User.findAll({
            where: { email: email },
            attributes: ['id']
        })

        // If user is exist with the same email then register is forbidden
        if (checkUser.length) {
            return res.status(400).json({ message: "Email already exist" })
        }

        // Create User
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

    res.header('Content-Type', 'application/json')
    res.header('Accept', 'application/json')
    res.header('Origin', process.env.CLIENT_HOSTNAME)

    // Get data from body
    const { email, password } = req.body

    try {

        // Get user detail
        const user = await User.findAll({
            where: { email: email }
        })

        // Compare Password
        const check = await bcrypt.compare(password, user[0].password)

        // Check Password
        if (!check) {
            res.status(404).json({ message: "Wrong Password" })
        }

        // Get user value and init in variable
        const userId = user[0].id
        const name = user[0].name
        const emailUser = user[0].email

        // Create access token that expires in 20 seconds
        const accessToken = jwt.sign({ userId, name, emailUser }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })

        // Create refresh token that expires in 1 day
        const refreshToken = jwt.sign({ userId, name, emailUser }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        // Update user refresh token in database
        await User.update({
            refresh_token: refreshToken
        }, {
            where: { id: userId }
        })

        // Set cookie by refresh token for 1 day
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        return res.json({ accessToken })

    } catch (error) {
        return res.status(404).json({ message: "Email does not exist." })
    }
}

const logout = async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*")

    // Get token in cookie
    const refreshToken = req.cookies.refreshToken

    // Check Token
    if (!refreshToken) {
        return res.sendStatus(204) // No Content
    }

    // Find Current User
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    })

    // Check User
    if (!user[0]) {
        return res.sendStatus(204)
    }

    // Get User ID
    const userId = user[0].id

    // Update token by user
    await User.update({
        refreshToken: null,
    }, {
        where: { id: userId },
    })

    // Clear Cookie
    res.clearCookie('refresh_token')

    return res.sendStatus(200);
}

module.exports = { getUsers, register, login, logout }