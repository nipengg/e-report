const { City } = require('../models')
const { Op } = require('sequelize')
const Validator = require('fastest-validator')

const v = new Validator()

const getCity = async (req, res) => {
    try {
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

const createCity = async (req, res) => {
    const { name } = req.body

    try {

        // Add schema validator for template validation
        const schema = {
            name: { type: "string", min: 3, max: 255 },
        }

        const validate = v.validate(req.body, schema)

        if (validate.length) {
            return res.status(400).json({ validator: validate })
        }

        await City.create({
            name: name,
        })

        return res.json({ message: 'Success!' })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

module.exports = { getCity, createCity }