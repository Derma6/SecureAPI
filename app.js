/*-----------------------------IMPORT-----------------------------*/

const express = require('express');
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize.js');


const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
    res.json('Hello, Heroku ! 👋🏻 ')
})

require('./src/routes/login')(app)

require('./src/routes/findAllClasses')(app)
require('./src/routes/findClasseByPk')(app)
require('./src/routes/createClasse')(app)
require('./src/routes/updateClasse')(app)
require('./src/routes/deleteClasse')(app)

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

app.listen(port) 