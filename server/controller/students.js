const { Student, City } = require('../models')
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
    const { name, age, gender, address, pob, dob, city } = req.body
    const getStudent = await Student.findAll({
        attributes: ['student_nim'],
        limit: 1,
        order: [['student_nim', "DESC"]]
    });

    //Get current year, convert student_nim into 2 first digits to find year
    //CurrentYear + 4 to account for graduation date
    const currentDate = new Date();
    const currentYear = (parseInt(currentDate.getFullYear()) % 1000) + 4;
    const tempStr = String(getStudent[0].student_nim);
    const nimYear = parseInt(tempStr.slice(0, 2));
    console.log(getStudent[0].student_nim);
    console.log(typeof getStudent[0].student_nim);
    console.log("currentYear = %d, nimYear = %d", currentYear, nimYear);

    //function to set newNim.
    //If currentYear is newer than highest student nim or student nim doesn't exist, create new nim, else, old nim + 1.
    let newNim = 0;
    if(getStudent[0].student_nim == NaN || currentYear != nimYear )
    {
        newNim = createNim();
        console.log(newNim);
    }
    else {
        newNim = getStudent[0].student_nim;
        newNim += 1;
    }
    try {

        // Add schema validator for template validation
        const schema = {
            name: 'string|required|max:255|min:3',
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
            student_nim: newNim,
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