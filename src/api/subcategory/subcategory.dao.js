import subcategoryModel from './subcategory.model.js'
import { Op } from 'sequelize'

const insertSubcategory = async data => {
  return await subcategoryModel.create(data)
}

const updateSubcategory = async (subcategoryID, data) => {
  await subcategoryModel.update(data, {
    where: {
      id: subcategoryID,
      deletedAt: null,
    },
  })
}

const findAllSubcategory = async () => {
  return await subcategoryModel.findAll({
    where: {
      deletedAt: null,
    },
  })
}

const findSubcategoryByID = async subcategoryID => {
  return await subcategoryModel.findOne({
    where: {
      id: subcategoryID,
      deletedAt: null,
    },
  })
}

const findSubcategoryByName = async name => {
  return await subcategoryModel.findOne({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
      deletedAt: null,
    },
  })
}

const deleteSubcategory = async subcategoryID => {
  return await subcategoryModel.destroy({
    where: {
      id: subcategoryID,
      deletedAt: null,
    },
  })
}

export {
  insertSubcategory,
  updateSubcategory,
  findAllSubcategory,
  findSubcategoryByID,
  findSubcategoryByName,
  deleteSubcategory,
}
