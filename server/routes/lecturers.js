var express = require('express')
var router = express.Router()
const { getLecturer, createLecturer } = require('../controller/lecturers')

// Get Lecture Data
router.get('/', getLecturer)

// Post Lecturer Data
router.post('/', createLecturer)

module.exports = router;