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

const createLecturer = async (req, res) => {
    const { lecturerName, lecturerAge, lecturerAddress } = req.body

    try {
        const schema = {
            lecturerName: 'string|required|max:255',
            lecturerAge: 'number|required|',
            lecturerAddress: 'string|required',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json(validate)
        }

        await Lecturer.create({
            lecturer_name: lecturerName,
            lecturer_age: lecturerAge,
            lecturer_address: lecturerAddress,
        })

        return res.json({ message: 'Success!' })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const editLecturer = async (req, res) => {
    const { lecturerID, newName, newAge, newAddress } = req.body

    try {
        const schema = {
            lecturerID: 'number|required',
            newName: 'string|required|max:255',
            newAge: 'number|required',
            newAddress: 'string|required',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json(validate)
        }

        await Lecturer.update(
            {
                lecturer_name: newName,
                lecturer_age: newAge,
                lecturer_address: newAddress
            },
            {
                where: { lecturer_id: lecturerID }
            }
        );

        res.status(200).json({ message: "Success!"})
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getLecturer, createLecturer, editLecturer }