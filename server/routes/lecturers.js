var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getLecturer, createLecturer, editLecturer } = require('../controller/lecturers')

// Get Lecture Data
router.get('/', verifyToken, getLecturer)

// Post Lecturer Data
router.post('/', createLecturer)

// Edit Lecturer Data
router.put('/', editLecturer)

module.exports = router;