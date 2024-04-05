import { DataTypes } from 'sequelize'

import imageTypes from './image.type.js'
import sequelize from '../../config/sequelize.js'

const imagesModel = sequelize.define('images', {
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
  related_id: {
    type: DataTypes.UUID,
    required: true,
    allowNull: false,
  },
  id_type: {
    type: DataTypes.ENUM(Object.values(imageTypes)),
    required: true,
    allowNull: false,
  },
})

export default imagesModel
