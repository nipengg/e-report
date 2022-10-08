const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    // Request auth bearer from headers
    const authHeader = req.headers['authorization']

    // If there's a header than split the bearer and the token
    const token = authHeader && authHeader.split(' ')[1]

    // If token is not exist then send status Unauthorized
    if (token == null) {
        return res.sendStatus('401')
    }

    // Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {

        if (err) {
            return res.sendStatus(403)
        }

        // Decode email because we do not want to show the user email in token
        req.email = decoded.email
        next()

    })
}

module.exports = { verifyToken }