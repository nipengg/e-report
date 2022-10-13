const { Ipk, Student } = require('../models')
const { Op } = require('sequelize')
const Validator = require('fastest-validator')

const v = new Validator()

const getIpk = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = limit * page;

        const totalRows = await Ipk.count({
            where: {
                [Op.or]: [

                    {
                        ipk_id: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            }
        });

        const totalPage = Math.ceil(totalRows / limit);

        const ipk = await Ipk.findAll({

            where: {
                [Op.or]: [

                    {
                        ipk_id: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            },
            offset: offset,
            limit: limit,
            order: [
                ['ipk_id', 'ASC'],
            ],
            include: [{
                model: Student,
                as: "student",
            }],
        })
        return res.json(
            { 
                data: ipk,
                page: page,
                limit: limit,
                totalRows: totalRows,
                totalPage: totalPage,
             })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const createIpk = async (req, res) => {
    const { id, nim, semester, score } = req.body

    try {

        // Add schema validator for template validation
        const schema = {
            id: 'number|required',
            nim: 'number|required',
            semester: 'number|required',
            score: 'number|required',
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({ validator: validate })
        }


        await Ipk.create({
            ipk_id: id,
            nim: nim,
            ipk_semester: semester,
            ipk_score: score,
        })

        return res.json({ message: 'Success!' })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

module.exports = { getIpk, createIpk }