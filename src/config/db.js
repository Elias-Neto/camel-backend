import sequelize from './sequelize.js'

// Models

import imagesCategories from '../api/images/categories/images-categories.model.js'
import imagesProducts from '../api/images/products/images-products.model.js'
import categoryModel from '../api/categories/categories.model.js'
import ordersModel from '../api/orders/orders.model.js'
import ordersProductModel from '../api/order-product/order-product.model.js'
import productsModel from '../api/products/products.model.js'
import usersModel from '../api/users/users.model.js'

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

// One Product has MANY Images AND one Image has ONE Product
productsModel.hasMany(imagesProducts, {
  foreignKey: 'product_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})
imagesProducts.belongsTo(productsModel, {
  foreignKey: 'product_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})

// One Category has MANY Images AND one Image has ONE Category
categoryModel.hasMany(imagesCategories, {
  foreignKey: 'category_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})
imagesCategories.belongsTo(categoryModel, {
  foreignKey: 'category_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})

async function connectToDatabase() {
  try {
    sequelize.authenticate()
    // sequelize.sync()
    sequelize.sync({ force: true })
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
