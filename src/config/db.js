import sequelize from './sequelize.js'

// Models

import usersModel from '../api/users/users.model.js'
import ordersModel from '../api/orders/orders.model.js'
import productsModel from '../api/products/products.model.js'
import ordersProductModel from '../api/order-product/order-product.model.js'

// RELATIONSHIPS

// Onde User has MANY Orders AND One Order has ONE User
usersModel.hasMany(ordersModel, {
  foreignKey: 'user_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})
ordersModel.belongsTo(usersModel, {
  foreignKey: 'user_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})

// One Order has MANY Products AND One Product has MANY Orders
ordersProductModel.belongsToMany(productsModel, {
  through: 'OrderProduct',
  foreignKey: 'order_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})
ordersProductModel.belongsToMany(ordersModel, {
  through: 'OrderProduct',
  foreignKey: 'product_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})

async function connectToDatabase() {
  try {
    sequelize.authenticate()
    sequelize.sync()
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
