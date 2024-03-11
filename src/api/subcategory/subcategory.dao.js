import { Sequelize } from 'sequelize'

import subcategory from './subcategory.model.js'

import { isDefined } from '../../helpers/object-helper.js'
import { searchAttributeString } from '../../helpers/query-helper.js'

const insertSubcategory = async data => {
  return await subcategory.create(data)
}

const findAndCountExamples = async params => {
  const { limit, offset, sortBy, sortOrder, filters, search } = params

  const options = {
    where: {
      deletedAt: null,
      ...(isDefined(search) && {
        [Sequelize.Op.or]: [
          {
            field1: {
              [Sequelize.Op.iLike]: `%${searchAttributeString(search)}%`,
            },
          },
          {
            field2: {
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

  const result = await examplesModel.findAndCountAll(options)

  return {
    count: result.count,
    data: result.rows,
  }
}

const findSubcategoryByID = async exampleID => {
  return await examplesModel.findOne({
    where: {
      id: exampleID,
      deletedAt: null,
    },
  })
}

const findSubcategoryByName = async field1 => {
  return await examplesModel.findOne({
    where: {
      field1,
      deletedAt: null,
    },
  })
}

const updateSubcategory = async (exampleID, data) => {
  await examplesModel.update(data, {
    where: {
      id: exampleID,
      deletedAt: null,
    },
  })

  return await findExampleByID(exampleID)
}

const deleteSubcategory = async exampleID => {
  return await examplesModel.destroy({
    where: {
      id: exampleID,
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
