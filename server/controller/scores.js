const { Score, Enroll, Lecturer, Student, Course, Class } = require('../models')
const { Op } = require('sequelize')
const Validator = require('fastest-validator')

const v = new Validator()

const getScore = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = limit * page;

        const totalRows = await Score.count({
            where: {
                [Op.or]: [
                    {
                        score_id: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                ]
            },
            include: [{
                model: Enroll,
                as: "enroll",
            }],
        });

        const totalPage = Math.ceil(totalRows / limit);

        const scores = await Score.findAll({
            where: {
                [Op.or]: [
                    {
                        score_id: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                ]
            },
            offset: offset,
            limit: limit,
            order: [
                ['score_id', 'ASC'],
            ],
            include: [{
                model: Enroll,
                as: "enroll",
                include: [
                    {
                        model: Student,
                        as: 'student'
                    },
                    {
                        model: Course,
                        as: 'course'
                    },
                    {
                        model: Lecturer,
                        as: 'lecturer'
                    },
                    {
                        model: Class,
                        as: 'class'
                    },
                ]
            }],
        })

        return res.json({
            data: scores,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const getStudentScores = async (req, res) => {
    try {
        const nim = req.query.nim
        const semester = req.query.semester
        let scoreStudent = [], temp, check = true

        const enrollStudent = await Enroll.findAll({
            where: {
                nim: nim,
            },
            attributes: ['enroll_id'],
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
                where: {
                    semester: semester
                },
                as: "course"
            }],
        })

        if (enrollStudent.length == 0) {
            check = false
        }

        for (let i = 0; i < enrollStudent.length; i++) {
            temp = await Score.findAll({
                attributes: ['score_id', 'score_semester', 'score'],
                include: [{
                    model: Enroll,
                    as: 'enroll',
                    attributes: ['enroll_id', 'nim'],
                    include: [
                        {
                            model: Course,
                            as: 'course'
                        },
                        {
                            model: Lecturer,
                            as: 'lecturer'
                        },
                        {
                            model: Class,
                            as: 'class'
                        },
                    ]
                }],
                where: {
                    enroll_id: enrollStudent[i].enroll_id
                }
            })

            if (temp[0].score == null) {
                check = false
            }

            scoreStudent[i] = temp[0]
        }

        return res.json({ data: scoreStudent, check: check })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createScore = async (req, res) => {
    const { id, semester, enroll_id, score } = req.body

    try {

        // Add schema validator for template validation
        const schema = {
            id: 'number|required',
            semester: 'number|required',
            enroll_id: 'number|required',
            score: 'number|required',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({ validator: validate })
        }


        await Score.create({
            score_id: id,
            score_semester: semester,
            enroll_id: enroll_id,
            score: score,
        })

        return res.json({ message: 'Success!' })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

const updateScore = async (req, res) => {
    const { value } = req.body
    try {
        const id = req.query.id

        await Score.update(
            {
                score: value
            },
            {
                where: { score_id: id }
            }
        )
        console.log(value)
        return res.status(200).json({ message: "Success!" })
    }
    catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

module.exports = { getScore, createScore, getStudentScores, updateScore }