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

module.exports = { getClass }