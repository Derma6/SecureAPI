const { Personnage } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/dofus/classes/:id', auth, (req, res) => {
        Personnage.findByPk(req.params.id)
            .then(personnage => {
                const message = 'Une classe a bien été trouvée.'
                res.json({message, data: personnage})
            })
            .catch(error => {
                const message = `La liste des classes n'a pas pu être récupérée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: error})
            }) 
    })
}