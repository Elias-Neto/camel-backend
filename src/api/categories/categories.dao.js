import categoryModel from './categories.model.js'

import { Sequelize } from 'sequelize'
import { isDefined } from '../../helpers/object-helper.js'
import { searchAttributeString } from '../../helpers/query-helper.js'

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
  const { limit, offset, sortBy, sortOrder, filters, search } = params
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
          {
            type: {
              [Sequelize.Op.iLike]: `%${searchAttributeString(search)}%`,
            },
          },
        ],
      }),
      ...filters,
    },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [[sortBy, sortOrder]],
  }
  const result = await categoryModel.findAndCountAll(options)

  return {
    count: result.count,
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
}
