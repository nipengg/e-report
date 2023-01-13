var express = require('express')
var router = express.Router()
const { verifyToken } = require('../middleware/VerifyToken')
const { getCourse, createCourse, editCourse, getAttendance, enrollStudentPage, wenomechainsama_tumajarbisaun_wifenlooof_eselifterbraun } = require('../controller/courses')

router.get('/', verifyToken, getCourse)
router.post('/', createCourse)
router.put('/', editCourse)
router.get('/attend/:courseID', getAttendance)
router.get('/attend/:courseID/:classID', enrollStudentPage)
router.put('/attend/student', wenomechainsama_tumajarbisaun_wifenlooof_eselifterbraun)

module.exports = router;