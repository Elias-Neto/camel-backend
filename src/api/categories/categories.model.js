import { DataTypes } from 'sequelize'

import sequelize from '../../config/sequelize.js'

const categoryModel = sequelize.define('categories', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isBrand: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
})

export default categoryModel
