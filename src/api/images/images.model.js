import { DataTypes } from 'sequelize'

import sequelize from '../../config/sequelize.js'

const imagesModel = sequelize.define('images', {
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
  product_id: {
    type: DataTypes.UUID,
  },
  category_id: {
    type: DataTypes.UUID,
  },
})

export default imagesModel
