import { Op } from 'sequelize'
import categoryModel from './category.model.js'

const insertCategory = async data => {
  return await categoryModel.create(data)
}

const updateCategory = async (categoryID, data) => {
  await categoryModel.update(data, {
    where: {
      category_id: categoryID,
      deleteAt: null,
    },
  })

  return await findCategoryByID(categoryID)
}

const findCategoryByID = async categoryID => {
  return await categoryModel.findOne({
    where: {
      category_id: categoryID,
      deleteAt: null,
    },
  })
}

const findCategoryByName = async categoryNM => {
  return await categoryModel.findAll({
    where: {
      category_name: {
        [Op.like] : `%${categoryNM}%`
      } 
    }
  })
}

const deleteCategory = async categoryID => {
  return await categoryModel.destroy({
    where: {
      category_id: categoryID,
      deleteAt: null,
    },
  })
}

export {
  insertCategory,
  updateCategory,
  findCategoryByID,
  findCategoryByName,
  deleteCategory
}