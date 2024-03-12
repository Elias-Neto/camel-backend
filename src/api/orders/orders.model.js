import { DataTypes } from 'sequelize'

import sequelize from '../../config/sequelize.js'

const ordersModel = sequelize.define('orders', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  total: {
    type: DataTypes.STRING(100),
    required: true,
    allowNull: false,
  },
})

export default ordersModel
