import { DataTypes } from 'sequelize'

import sequelize from '../../config/sequelize.js'

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
    type: DataTypes.STRING,
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

export default productsModel
