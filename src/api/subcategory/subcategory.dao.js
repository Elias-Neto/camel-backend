import { Sequelize } from 'sequelize'
import Op from Sequelize;
import subcategory from './subcategory.model.js'

import { isDefined } from '../../helpers/object-helper.js'
import { searchAttributeString } from '../../helpers/query-helper.js'

const insertSubcategory = async data => {
  return await subcategory.create(data)
}

const findSubcategoryByID = async subcategoryID => {
  return await subcategory.findOne({
    where: {
      id: subcategoryID,
      deletedAt: null,
    },
  })
}

const findSubcategoryByName = async field1 => {
  return await subcategory.findOne({
    where: {
       subcategory_name:{
        [Op.like] : `%${field1}%`
       },
      deletedAt: null,
    },
  })
}

const updateSubcategory = async (subcategoryID, data) => {
  await subcategory.update(data, {
    where: {
      id: subcategoryID,
      deletedAt: null,
    },
  })

  return await findSubcategoryByID(subcategoryID)
}

const deleteSubcategory = async subcategoryID => {
  return await subcategory.destroy({
    where: {
      id: subcategoryID,
      deletedAt: null,
    },
  })
}

export {
  insertSubcategory,
  findSubcategoryByID,
  findSubcategoryByName,
  updateSubcategory,
  deleteSubcategory,
}
