const { Ipk, Student, Score, Enroll } = require('../models')
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

const renderIPK = async (req, res) => {
    try {
        const nim = req.query.nim
        let count = new Array(8), temp;
        let IPK = new Array(8);
        let renderedIPK = new Array(8);
        count.fill(0, 0, 8);
        IPK.fill(0, 0, 8);
        renderedIPK.fill(0, 0, 8);

        const enrollStudent = await Enroll.findAll({
            where: {
                nim: nim,
            },
            attributes: ['enroll_id'],
        })

        for (let i = 0; i < enrollStudent.length; i++) {
            temp = await Score.findAll({
                where: {
                    enroll_id: enrollStudent[i].enroll_id
                }
            })
            if(temp[0].score != null)
            {
                count[temp[0].score_semester - 1] += 1;
                IPK[temp[0].score_semester - 1] += temp[0].score
            }
            
        }
        for(i = 0; i < 8; i++)
        {
            if(count[i] != 0 && IPK[i] != 0)
            {
                renderedIPK[i] = (IPK[i] / count[i]) * 0.04
            }
        }

        return res.json({ data: renderedIPK })
        
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getIpk, createIpk, renderIPK }