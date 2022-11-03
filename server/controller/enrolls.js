const { Course, Lecturer, Class, Student, Enroll} = require('../models')
const { Op } = require('sequelize')
const Validator = require('fastest-validator')

const v = new Validator()

const getEnroll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = limit * page;

        const totalRows = await Enroll.count({
            where: {
                [Op.or]: [
                    {
                        enroll_id: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                ]
            },
            include: [{
                model: Lecturer,
                as: 'lecturer',
            }, {
                model: Class,
                as: 'class'
            },
            {
                model: Course,
                as: "course"
            },
            {
                model: Student,
                as: "student"
            }]
        });

        const totalPage = Math.ceil(totalRows / limit);

        const enrolls = await Enroll.findAll({
            where: {
                [Op.or]: [
                    {
                        enroll_id: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                ]
            },
            offset: offset,
            limit: limit,
            order: [
                ['enroll_id', 'ASC'],
            ],
            include: [{
                model: Lecturer,
                as: 'lecturer',
            },
            {
                model: Class,
                as: 'class'
            },
            {
                model: Course,
                as: "course"
            },
            {
                model: Student,
                as: "student"
            }],
        });

        return res.json({
            data: enrolls,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createStudentEnroll = async (req, res) => {
    try {
        const id = req.query.id

        const student = await Student.findAll({
            where: {
                student_nim: id,
            }
        })

        const studentMajor = student[0].major

        const courses = await Course.findAll({
            where: {
                major: studentMajor,
            },
            order: [
                ['semester', 'ASC'],
            ]
        })

        const classes = await Class.findAll()

        const lecturers = await Lecturer.findAll()

        return res.json({ course: courses, class: classes, lecturer: lecturers })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createEnroll = async (req, res) => {
    const { enroll_id, nim, class_id, lecturer_id, course_id } = req.body

    try {

        // Add schema validator for template validation
        const schema = {
            enroll_id: 'number|required',
            nim: 'number|required',
            class_id: 'number|required',
            lecturer_id: 'number|required',
            course_id: 'number|required',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({ validator: validate })
        }


        await Enroll.create({
            enroll_id: enroll_id,
            nim: nim,
            class_id: class_id,
            lecturer_id: lecturer_id,
            course_id: course_id,

        })

        return res.json({ message: 'Success!' })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

module.exports = { getEnroll, createEnroll, createStudentEnroll }