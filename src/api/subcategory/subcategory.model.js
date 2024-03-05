import { DataTypes } from 'sequelize'

import sequelize from '../../config/sequelize.js'

//Referência ao category.model.js *Remover o comentario quando estiver implementado*
//import categoryModel from "../category/category.model.js"

const subcategoryModel = sequelize.define('subcategory', {
  subcategory_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  subcategory_name: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  subcategory_description: {
    type: DataTypes.STRING,
    allowNull: true
  },

})

subcategoryModel.belongsTo(categoryModel, { foreignKey: "category_id", onDelete: "CASCADE" });
categoryModel.hasMany(subcategoryModel, { foreignKey: "category_id", onDelete: "CASCADE" });

export default subcategoryModel
