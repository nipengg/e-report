const { User } = require('../models')
const jwt = require('jsonwebtoken')

const refreshToken = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.sendStatus(401) // Unauthorized
        }

        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        if (!user[0]) {
            return res.sendStatus(403) // Forbidden
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {

            if (err) {
                return res.sendStatus(403)
            }

            const userId = user[0].id
            const name = user[0].name
            const emailUser = user[0].email
            const accessToken = jwt.sign({ userId, name, emailUser }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            })

            res.json({ accessToken })

        })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { refreshToken }