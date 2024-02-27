import { DataTypes } from 'sequelize'

import sequelize from '../../config/sequelize.js'

const categoryModel = sequelize.define('categories', {
  category_id: {
    type: DataTypes.NUMBER,
    primaryKey: true
  },
  category_name: {
    type: DataTypes.STRING(100),
    required: true,
    allowNull: false,
  },
  category_description: {
    type: DataTypes.STRING(100),
    required: true,
    allowNull: false,
  },
  sub_category_id: {
    type: DataTypes.STRING(100),
    required: true,
    allowNull: false,
  },
})

export default categoryModel
