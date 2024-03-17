import { DataTypes } from 'sequelize'

import sequelize from '../../config/sequelize.js'

const categoryModel = sequelize.define('categories', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    required: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  type: {
    type: DataTypes.STRING(50),
    required: true,
    allowNull: false,
  },
})

export default categoryModel
