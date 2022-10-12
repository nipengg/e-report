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

module.exports = { getEnroll }