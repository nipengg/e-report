const { City } = require('../models')
const { Op } = require('sequelize')
const Validator = require('fastest-validator')

const v = new Validator()

const getCity = async (req, res) => {
    try {
        res.header("Access-Control-Allow-Origin", "*")

        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || '';
        const offset = limit * page;

        const totalRows = await City.count({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }
        });

        const totalPage = Math.ceil(totalRows / limit);

        const cities = await City.findAll({
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            },
            offset: offset,
            limit: limit,
            order: [
                ['id', 'ASC'],
            ]
        });

        return res.json({
            data: cities,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPage: totalPage,
        });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getCity }