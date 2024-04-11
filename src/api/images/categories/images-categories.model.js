import { DataTypes } from 'sequelize'

import sequelize from '../../../config/sequelize.js'

const imagesCategoriesModel = sequelize.define('images-categories', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  src: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
})

export default imagesCategoriesModel
