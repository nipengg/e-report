var express = require('express')
var router = express.Router()
const { getLecturer, postLecturer } = require('../controller/lecturer')

// Get Lecture Data
router.get('/', getLecturer)

// Post Lecturer Data
router.post('/store', postLecturer)

module.exports = router;