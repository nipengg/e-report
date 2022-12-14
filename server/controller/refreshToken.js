const { User } = require('../models')
const jwt = require('jsonwebtoken')

const refreshToken = async (req, res) => {

    try {

        // Get refresh token from cookie
        const refreshToken = req.cookies.refreshToken
        
        console.log(refreshToken);
        // Check if token is exist
        if (!refreshToken) {
            return res.status(401).json({ message: 'No access, Please Sign In' }) // Unauthorized
        }

        // Find user with the same refresh token in database
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        // If user not exist then is forbidden
        if (!user[0]) {
            return res.sendStatus(403) // Forbidden
        }

        // Verify Token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {

            if (err) {
                return res.sendStatus(403)
            }

            // Sign another refresh token
            const userId = user[0].id
            const name = user[0].name
            const emailUser = user[0].email
            const accessToken = jwt.sign({ userId, name, emailUser }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '10m'
            })

            res.json({ accessToken })

        })

    } catch (error) {
        console.log(error)
        res.status(404)
    }
}

module.exports = { refreshToken }