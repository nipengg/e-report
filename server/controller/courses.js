const { Course } = require('../models')
const { Op } = require('sequelize')
const Validator = require('fastest-validator')

const v = new Validator()

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
    const { courseName, semesterCreditUnit } = req.body
    try {
        const schema = {
            courseName: 'string|required|max:255|min:3',
            semesterCreditUnit: 'number|required'
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({ validator: validate })
        }

        await Course.create({
            course_name: courseName,
            semester_credit_unit: semesterCreditUnit,
        })

        return res.status(200).json({ message: 'Success!' })

    } catch (error) {
        return res.status(404).json({ messsage: error.message })
    }
}

module.exports = { getCourse, createCourse }