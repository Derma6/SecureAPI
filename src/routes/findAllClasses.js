const { Personnage } = require('../db/sequelize')
const { Op } = require('sequelize')

const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/dofus/allClasses', auth, (req, res) => {
        if (req.query.name) {
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5

            if (name.length < 2) {
                return res.status(400).json({ message: 'La recherche doit comporter au minimum 2 caractères.' })
            }

            return Personnage.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                order: ['name'],
                limit: limit
            })
                .then(({ count, rows }) => {
                    const message = `Il y a ${count} classe correspondant au nom ${name}`
                    res.json({ message, data: rows })
                })
        }
        Personnage.findAll({ order: ['name'] })
            .then(personnages => {
                const message = 'La liste a bien été récupérée.'
                res.json({ message, data: personnages })
            })
            .catch(error => {
                const message = `La liste des classes n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({ message, data: error })
            })
    })
}