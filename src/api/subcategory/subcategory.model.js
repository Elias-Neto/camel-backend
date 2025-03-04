import { DataTypes } from 'sequelize'

import sequelize from '../../config/sequelize.js'

const subcategoryModel = sequelize.define('subcategory', {
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
})

export default subcategoryModel
