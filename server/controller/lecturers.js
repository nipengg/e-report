const { Lecturer } = require('../models')
const { Op } = require('sequelize')
const Validator = require('fastest-validator')

const v = new Validator()

const getLecturer = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = limit * page;

        const totalRows = await Lecturer.count({
            where: {
                [Op.or]: [

                    {
                        lecturer_id: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                    {
                        lecturer_name: {
                            [Op.like]: '%' + search + '%'
                        },
                    }
                ]
            }
        });

        const totalPage = Math.ceil(totalRows / limit);
        const lecturers = await Lecturer.findAll({
            where: {
                [Op.or]: [

                    {
                        lecturer_id: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                    {
                        lecturer_name: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            },
            offset: offset,
            limit: limit,
            order: [
                ['lecturer_id', 'ASC'],
            ] 
        });
        return res.json({ 
            data: lecturers,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const postLecturer = async (req, res) => {
    try {
        const schema = {
            lecturer_name: 'string|required',
            address: 'string|required',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json(validate)
        }

        res.send('ok')
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getLecturer, postLecturer }