import sequelize from './sequelize.js'

const envIsDevelopment = process.env.NODE_ENV === 'development'

// Models

// import usersModel from '../api/users/users.model.js'
// import addressesModel from '../models/addressesModel.js'

// RELATIONSHIPS

// One User has One Address
// usersModel.hasOne(addressesModel, {
//   foreignKey: 'id_cliente',
//   onUpdate: 'CASCADE',
//   onDelete: 'CASCADE',
// })
// addressesModel.belongsTo(usersModel, {
//   foreignKey: 'id_cliente',
//   onUpdate: 'CASCADE',
//   onDelete: 'CASCADE',
// })

async function connectToDatabase() {
  try {
    sequelize.authenticate()
    sequelize.sync({ force: envIsDevelopment })
    // eslint-disable-next-line
    console.log('✅ Database connected!')
  } catch (error) {
    // eslint-disable-next-line
    console.log('❌ Database not connected!')
    // eslint-disable-next-line
    console.log(error)
  }
}

connectToDatabase()
