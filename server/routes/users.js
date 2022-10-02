var express = require('express')
const { getUsers, register, login, logout } = require('../controller/users')
const { verifyToken } = require('../middleware/VerifyToken')
const { refreshToken } = require('../controller/refreshToken')
var router = express.Router();

router.get('/', verifyToken, getUsers);
router.post('/', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);

module.exports = router;
