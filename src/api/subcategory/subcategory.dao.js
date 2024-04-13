import { Sequelize } from 'sequelize'

import subcategoryModel from './subcategory.model.js'

import { isDefined } from '../../helpers/object-helper.js'
import { searchAttributeString } from '../../helpers/query-helper.js'

const insertSubcategory = async data => {
  return await subcategoryModel.create(data)
}

const findAndCountSubcategories = async params => {
  const { limit, offset, sortBy, sortOrder, search, name, description, type } =
    params

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
            description: {
              [Sequelize.Op.iLike]: `%${searchAttributeString(search)}%`,
            },
          },
        ],
      }),
      ...(isDefined(name) && { name: searchAttributeString(name) }),
      ...(isDefined(description) && {
        description: searchAttributeString(description),
      }),
      ...(isDefined(type) && { type }),
    },
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [[sortBy, sortOrder]],
  }

  const result = await subcategoryModel.findAndCountAll(options)

  return {
    count: result.count,
    data: result.rows,
  }
}

const findSubcategoryByName = async name => {
  return await subcategoryModel.findOne({
    where: {
      name,
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

const findSubcategoriesByIDs = async subcategoryIDs => {
  return await subcategoryModel.findAll({
    where: {
      id: { [Sequelize.Op.in]: subcategoryIDs },
      deletedAt: null,
    },
  })
}

const updateSubcategory = async (subcategoryID, data) => {
  await subcategoryModel.update(data, {
    where: {
      id: subcategoryID,
      deletedAt: null,
    },
  })

  return await findSubcategoryByID(subcategoryID)
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
  findAndCountSubcategories,
  findSubcategoryByName,
  findSubcategoryByID,
  findSubcategoriesByIDs,
  updateSubcategory,
  deleteSubcategory,
}
