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

module.exports = { getScore }