const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privatekey = require('../auth/privatekey')



module.exports = (app) => {
    app.post('/api/login', (req, res) => {
        User.findOne({ where: { username: req.body.username } })
            .then(user => {

                if(!user) return res.status(404).json({message: 'Utilisateur introuvable'})

                bcrypt.compare(req.body.password, user.password)
                    .then(isPasswordValid => {

                        if (!isPasswordValid) return res.status(401).json({message: 'Mot de passe invalide'})
                            
                        // JWT
                        const token = jwt.sign(
                            { userId : user.id},
                            privatekey,
                            { expiresIn: '24h'}
                        )

                        const message = `L'utilisteur a été connecté avec succès`;
                        return res.json({message, data: user, token})
                    })
            })
            .catch( error=> {
                const message = `L'utilisteur n'a pas pu être connecté. Réessayer dans quelques instants.`;
                return res.json({message, data : error})
            })
    })
}
  