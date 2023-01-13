const { Course, Enroll, Class, Student } = require('../models')
const { Op } = require('sequelize')
const Validator = require('fastest-validator')

const v = new Validator()

const enrollStudentPage = async (req, res) => {

    try {
        const classIDEnroll = req.params.classID
        const currentID = req.params.courseID

        const enrolledStudent = await Enroll.findAll({
            where: {
                class_id: classIDEnroll,
                course_id: currentID
            },
        })
        const courseName = await Course.findAll({
            where: {
                course_id: currentID
            },
            attributes: ['course_name'],
        })
        const className = await Class.findAll({
            where: {
                class_id: classIDEnroll
            },
            attributes: ['class_name']
        })
        let studentsidraggedfromhell = new Array()

        for (let i = 0; i < enrolledStudent.length; i++) {
            studentsidraggedfromhell.push(await Student.findAll({
                where: {
                    student_nim: enrolledStudent[i].nim
                },
            }))
        }
        res.status(200).json({ data: studentsidraggedfromhell, courseName: courseName, className: className })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
const getAttendance = async (req, res) => {
    try {
        const currentID = req.params.courseID

        const courseAttendance = await Enroll.findAll({
            where: {
                course_id: currentID
            }
        })
        var classIDSet = new Set()

        for (let i = 0; i < courseAttendance.length; i++) {
            classIDSet.add(courseAttendance[i].class_id)
        }
        let classID = Array.from(classIDSet)

        const classEnroll = await Class.findAll({
            where: {
                class_id: classID
            }
        })

        const courseName = await Course.findAll({
            where: {
                course_id: currentID
            },
            attributes: ['course_name'],
        })

        res.status(200).json({ data: classEnroll, courseName: courseName })
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Wtf does this function do??? Who tf wrote this? Are you wrong in the head, mate?
const wenomechainsama_tumajarbisaun_wifenlooof_eselifterbraun = async (req, res) => {
    try {
        const turi_ip_ip_ip = req.body.studentNIM
        const tumajarbisaun = req.body.classID
        const dipenjaraaaaaaaaa = req.body.courseID

        await Enroll.increment(
            'attendance_count', { by: 1, where: {
                course_id: dipenjaraaaaaaaaa,
                nim: turi_ip_ip_ip,
                class_id: tumajarbisaun
            }})
        res.status(200).json({ message: "Eselifterbraun!" })
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
    
}



const getCourse = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = limit * page;

        const totalRows = await Course.count({
            where: {
                [Op.or]: [
                    {
                        course_name: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                    {
                        course_id: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            },
        });

        const totalPage = Math.ceil(totalRows / limit);

        const courses = await Course.findAll({
            where: {
                [Op.or]: [
                    {
                        course_name: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                    {
                        course_id: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            },
            offset: offset,
            limit: limit,
            order: [
                ['course_id', 'ASC'],
            ],
        });
        return res.json({
            data: courses,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createCourse = async (req, res) => {
    const { courseName, semesterCreditUnit, totalAttendance, semester, major } = req.body
    try {
        const schema = {
            courseName: 'string|required|max:255|min:3',
            semesterCreditUnit: 'number|required',
            totalAttendance: 'number|required',
            semester: 'number|required',
            major: 'string|required',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({ validator: validate })
        }

        await Course.create({
            course_name: courseName,
            semester_credit_unit: semesterCreditUnit,
            total_attendance: totalAttendance,
            semester: semester,
            major: major,
        })

        return res.status(200).json({ message: 'Success!' })

    } catch (error) {
        return res.status(404).json({ messsage: error.message })
    }
}

const editCourse = async (req, res) => {
    const { courseID, newName, newSCU, newTA, newSemester, newMajor } = req.body

    try {
        const schema = {
            courseID: 'number|required',
            newName: 'string|required|max:255',
            newSCU: 'number|required',
            newTA: 'number|required',
            newSemester: 'number|required',
            newMajor: 'string|required|max:5'
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json(validate)
        }

        await Course.update(
            {
                course_name: newName,
                semester_credit_unit: newSCU,
                total_attendance: newTA,
                semester: newSemester,
                major: newMajor
            },
            {
                where: { course_id: courseID }
            }
        );

        res.status(200).json({ message: "Success!" })
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}


module.exports = { getCourse, createCourse, editCourse, getAttendance, enrollStudentPage, wenomechainsama_tumajarbisaun_wifenlooof_eselifterbraun }