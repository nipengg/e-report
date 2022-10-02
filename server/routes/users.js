var express = require('express')
const { getUsers, register, login } = require('../controller/users')
const { verifyToken } = require('../middleware/VerifyToken')
const { refreshToken } = require('../controller/refreshToken')
var router = express.Router();

router.get('/', verifyToken, getUsers);
router.post('/', register);
router.post('/login', login);
router.get('/token', refreshToken);

module.exports = router;
