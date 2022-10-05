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
                        id: {
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
                        id: {
                            [Op.like]: '%' + search + '%'
                        }
                    }
                ]
            },
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

module.exports = { getIpk }