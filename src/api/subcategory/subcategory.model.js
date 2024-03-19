import { DataTypes } from 'sequelize'

import sequelize from '../../config/sequelize.js'

//Referência ao category.model.js *Remover o comentario quando estiver implementado*
import categoryModel from "../category/category.model.js"

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
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING(50),
    required: true,
    allowNull: false,
  }
})

categoryModel.hasMany(subcategoryModel, { foreignKey: "id", onDelete: "CASCADE" });
subcategoryModel.belongsTo(categoryModel, { foreignKey: "id", onDelete: "CASCADE" });

export default subcategoryModel
