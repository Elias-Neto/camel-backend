import { DataTypes } from 'sequelize'

import sequelize from '../../../config/sequelize.js'

const imagesProductsModel = sequelize.define('images-products', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  src: {
    type: DataTypes.TEXT,
    required: true,
    allowNull: false,
  },
})

export default imagesProductsModel
