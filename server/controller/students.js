const { Student } = require('../models')
const Validator = require('fastest-validator')
const { Op } = require('sequelize')
const v = new Validator()

const createNim = () => {
    const currentDate = new Date();
    let nimYear = ((currentDate.getFullYear() % 1000) + 4) * 10000000;
    return nimYear;
}

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

const showStudent = async (req, res) => {
    try {
        const name = req.params.name

        const student = await Student.findAll({
            where: {
                student_name: name,
            }
        })

        res.json({ data: student })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createStudent = async (req, res) => {
    const { name, age, gender, address, pob, dob, city, major } = req.body

    const getStudent = await Student.findAll({
        attributes: ['student_nim'],
        limit: 1,
        order: [['student_nim', "DESC"]]
    });

    let newNim = 0;
    //Try to create newNim based on student_nim's value
    try
    {
        //Get current year, convert student_nim into 2 first digits to find year
        //CurrentYear + 4 to account for graduation date
        const currentDate = new Date();
        const currentYear = (parseInt(currentDate.getFullYear()) % 1000) + 4;
        const tempStr = String(getStudent[0].student_nim);
        const nimYear = parseInt(tempStr.slice(0, 2));

        //function to set newNim.
        //If currentYear is newer than highest student nim or student nim doesn't exist, create new nim, else, old nim + 1.
        if(currentYear != nimYear )
        {
            newNim = createNim();
            console.log(newNim);
        }
        else {
            newNim = getStudent[0].student_nim;
            newNim += 1;
        }
    }
    //Student_nim doesn't exist, create a default nim value.
    catch (error) {
        newNim = createNim();
    }
    try {
        // Add schema validator for template validation
        const schema = {
            name: 'string|required|max:255|min:3',
            age: 'number|required',
            gender: 'string|required|min:3|max:255',
            address: 'string|required',
            pob: 'string|required',
            dob: 'string|required',
            city: 'string|required',
            major: 'string|required',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({ validator: validate })
        }

        const dobDate = new Date(dob);

        await Student.create({
            student_name: name,
            student_nim: newNim,
            student_age: age,
            student_gender: gender,
            student_address: address,
            student_place_of_birth: pob,
            student_date_of_birth: dobDate,
            city: city,
            major: major,
        })

        return res.json({ message: 'Success!' })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

module.exports = { getStudent, createStudent, showStudent }