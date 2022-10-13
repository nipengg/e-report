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

const createStudent = async (req, res) => {
    const { name, nim, age, gender, address, pob, dob, city } = req.body

    try {

        // Add schema validator for template validation
        const schema = {
            name: 'string|required|max:255|min:3',
            nim: 'number|required',
            age: 'number|required',
            gender: 'string|required|min:3|max:255',
            address: 'string|required',
            pob: 'number|required',
            dob: 'string|required',
            city: 'number|required',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({ validator: validate })
        }

        const dobDate = new Date(dob);

        await Student.create({
            student_name: name,
            student_nim: nim,
            student_age: age,
            student_gender: gender,
            student_address: address,
            student_place_of_birth: pob,
            student_date_of_birth: dobDate,
            city_id: city,
        })

        return res.json({ message: 'Success!' })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

module.exports = { getStudent, createStudent }