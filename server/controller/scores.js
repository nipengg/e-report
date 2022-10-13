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

module.exports = { getScore, createScore }