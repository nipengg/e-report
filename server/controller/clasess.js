const { Class } = require('../models')
const { Op } = require('sequelize')
const Validator = require('fastest-validator')

const v = new Validator()

const getClass = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = limit * page;

        const totalRows = await Class.count({
            where: {
                [Op.or]: [
                    {
                        class_name: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                    {
                        class_id: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            }
        });

        const totalPage = Math.ceil(totalRows / limit);

        const classes = await Class.findAll({
            where: {
                [Op.or]: [
                    {
                        class_name: {
                            [Op.like]: '%' + search + '%'
                        },
                    },
                    {
                        class_id: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            },
            offset: offset,
            limit: limit,
            order: [
                ['class_id', 'ASC'],
            ]
        });
        return res.json({
            data: classes,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
             });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createClass = async (req, res) => {
    const { className, totalStudent } = req.body

    try {
        console.log(req.body)
        const schema = {
            className: 'string|required|max:255|min:3',
            totalStudent: 'number|required',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({ validator: validate })
        }

        await Class.create({
            class_name: className,
            total_student: totalStudent,
        })

        return res.json({ message: 'Success!' })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getClass, createClass }