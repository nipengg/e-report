const { Student, City } = require('../models')
const Validator = require('fastest-validator')
const { Op } = require('sequelize')
const v = new Validator()

const getStudent = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = limit * page;

        const totalRows = await Student.count({
            where: {
                [Op.or]: [
                    {
                        student_nim: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                    {
                        student_name: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            },
            include: [{
                model: City,
                as: "city",
            },],
        });

        const totalPage = Math.ceil(totalRows / limit);

        const students = await Student.findAll({
            where: {
                [Op.or]: [
                    {
                        student_nim: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                    {
                        student_name: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            },
            offset: offset,
            limit: limit,
            order: [
                ['student_nim', 'ASC'],
            ],
            include: [{
                model: City,
                as: "city",
            },],
        })
        return res.json({ 
            data: students,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
         })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getStudent }