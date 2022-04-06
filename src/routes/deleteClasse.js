const { Personnage } = require('../db/sequelize')
const auth = require('../auth/auth')


module.exports = (app) => {
    app.delete('/api/dofus/classes/:id', auth,(req, res) => {
        Personnage.findByPk(req.params.id).then(personnage => {
            
                const personnageDeleted = personnage;
                return Personnage.destroy({
                    where: { id: personnage.id }
                })
            .then(_ => {
                const message = `La classe ${personnageDeleted.name} a bien été supprimée.`
                res.json({message, data: personnageDeleted})
                })
            })
            .catch(error => {
                const message = `La liste des classes n'a pas pu être supprimée. Réessayez dans quelques instants.`
                res.status(500).json({message, data: error})
            }) 
    })
} 