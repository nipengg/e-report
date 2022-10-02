var express = require('express');
const { getUsers, register } = require('../controller/User');
var router = express.Router();

router.get('/', getUsers);
router.post('/', register);

module.exports = router;
