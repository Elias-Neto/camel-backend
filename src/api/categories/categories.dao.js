import categoryModel from './categories.model.js'

import { Sequelize } from 'sequelize'
import { isDefined } from '../../helpers/object-helper.js'
import { searchAttributeString } from '../../helpers/query-helper.js'
import subcategoryModel from '../subcategory/subcategory.model.js'

const insertCategory = async data => {
  return await categoryModel.create(data)
}

const updateCategory = async (categoryID, data) => {
  await categoryModel.update(data, {
    where: {
      id: categoryID,
      deletedAt: null,
    },
  })
}

const findAndCountCategories = async params => {
  const { limit, offset, sortBy, sortOrder, search, name, isBrand } = params

  const options = {
    where: {
      deletedAt: null,
      ...(isDefined(search) && {
        [Sequelize.Op.or]: [
          {
            name: {
              [Sequelize.Op.iLike]: `%${searchAttributeString(search)}%`,
            },
          },
        ],
      }),
      ...(isDefined(name) && { name: searchAttributeString(name) }),
      ...(isDefined(isBrand) && { isBrand }),
    },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [[sortBy, sortOrder]],
  }

  const result = await categoryModel.findAndCountAll(options)

  return {
    count: result.rows.length,
    data: result.rows,
  }
}

const findCategoryByID = async categoryID => {
  return await categoryModel.findOne({
    where: {
      id: categoryID,
      deletedAt: null,
    },
  })
}

const findSubcategoriesByCategoryID = async categoryID => {
  return await categoryModel.findAll({
    where: {
      id: categoryID,
      deletedAt: null,
    },
    include: [
      {
        model: subcategoryModel,
        required: false,
        where: {
          deletedAt: null,
        },
      },
    ],
  })
}

const findCategoryByName = async name => {
  return await categoryModel.findOne({
    where: {
      name: name,
      deletedAt: null,
    },
  })
}

const deleteCategory = async categoryID => {
  return await categoryModel.destroy({
    where: {
      id: categoryID,
      deletedAt: null,
    },
  })
}

export {
  insertCategory,
  updateCategory,
  findCategoryByID,
  findCategoryByName,
  deleteCategory,
  findAndCountCategories,
  findSubcategoriesByCategoryID,
}
