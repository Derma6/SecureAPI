module.exports = (sequelize, DataTypes) => {
return sequelize.define('Personnage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { 
                msg : 'Ce nom existe déjà.'
            },
            validate: {
                notEmpty: { msg : 'Le champ est vide'},
                notNull: { msg : 'Le nom est obligatoire'},
                len: {
                    args: [3, 20],
                    msg : 'Vous devez utilisé entre 3 et 20 caractères.'
                },
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: { msg : 'Le champ est vide'},
                notNull: { msg : 'La description est obligatoire'}
            }
        }
      }, {
          timestamps: true,
          createdAt: 'created',
          updateAt: false
      }
)}