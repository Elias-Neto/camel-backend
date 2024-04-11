import { DataTypes } from 'sequelize'

import sequelize from '../../config/sequelize.js'

import imagesModel from '../images/images.model.js'

const productsModel = sequelize.define('products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.STRING(100),
    required: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    required: true,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    required: false,
    allowNull: false,
    defaultValue: true,
  },
})

productsModel.hasMany(imagesModel, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
})
imagesModel.belongsTo(productsModel, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
})

export default productsModel
