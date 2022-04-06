const { Personnage } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')

const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/dofus/classes', auth, (req, res) => {

        Personnage.create(req.body)
            .then(personnage => {
                const message = `La classe ${req.body.name} a bien été crée.`
                res.json({message, data: personnage})
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message : error.message, data: error})
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message : error.message, data: error})
                }
                const  message = `La liste des classes n'a pas pu être créer. Réessayez dans quelques instants.`
                res.status(500).json({message, data: error})
            }) 
    })
}   