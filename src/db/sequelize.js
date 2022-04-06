const { Sequelize, DataTypes } = require('sequelize');
const personnageModel = require('../models/personnage')
const UserModel = require('../models/user')

const bcrypt = require('bcrypt')

const axios = require('axios')


/*-----------------------------ORM SEQUELIZE-----------------------------*/

let sequelize;

// if (process.env.NODE_ENV === 'production') {
//     sequelize = new Sequelize('dofus', 'root', '',
//         {
//             host: 'localhost',
//             dialect: 'mariadb',
//             dialectOptions: {
//                 timezone: '+02:00'
//             },
//             logging: false
//         })
// } else {
    sequelize = new Sequelize('dofus', 'root', '',
        {
            host: 'localhost',
            dialect: 'mariadb',
            dialectOptions: {
                timezone: '+02:00'
            },
            logging: false
        })
// }

sequelize.authenticate()
    .then(_ => console.log('La connexion à la base de données a bien été établis.'))
    .catch(error => console.error('Impossible de se connecter à la base de données.'))

const Personnage = personnageModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({force: false})
        .then(_ => {
            console.log('La base de données "dofus" a bien été synchronisée.')

        //     axios.get(`http://localhost:3001/dofus/classes`)
        //     .then((response) => {
        //     response.data.map((element) => {
        //         Personnage.create({
        //                 "name": element.name,
        //                 "description": element.description,
        //             })
        //     }); 

        //   })

        // bcrypt.hash('pikachu', 10)
        //     .then(hash => {User.create({ username: 'pikachu', password: hash})
        //     .then(user => console.log(user.toJSON()))

        //     console.log('La base de donnée a bien été initialisée !');
        // })
    })
}
    
module.exports = { initDb, Personnage, User }