var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getLecturer, createLecturer } = require('../controller/lecturers')

// Get Lecture Data
router.get('/', verifyToken, getLecturer)

// Post Lecturer Data
router.post('/', createLecturer)

module.exports = router;