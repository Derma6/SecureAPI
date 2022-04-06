const { Personnage } = require('../db/sequelize')
const { ValidationError } = require('sequelize')

const auth = require('../auth/auth')

module.exports = (app) => {
    app.put('/api/dofus/classes/:id', auth, (req, res) => {
        const id = req.params.id
        console.log(req.body)
        Personnage.update(req.body, {
            where: {id: id}
        })
            .then(_ => {
                return Personnage.findByPk(id).then(personnage => {
                const message = `La classe ${req.body.name} a bien été mise à jour.`
                res.json({message, data: personnage})
                }) 
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message : error.message, data: error})
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message : error.message, data: error})
                }
                const message = `La liste des classes n'a pas pu être modifié. Réessayez dans quelques instants.`
                res.status(500).json({message, data: error})
            }) 
    })
}