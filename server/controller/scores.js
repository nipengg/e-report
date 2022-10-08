const { Score, Student, Course } = require('../models')
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
                    {
                        nim: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            },
            include: [{
                model: Student,
                as: "student",
            },
            {
                model: Course,
                as: "course"
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
                    {
                        nim: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            },
            offset: offset,
            limit: limit,
            order: [
                ['score_id', 'ASC'],
            ],
            include: [{
                model: Student,
                as: "student",
            },
            {
                model: Course,
                as: "course"
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