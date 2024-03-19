import { Sequelize } from 'sequelize'
import Op from Sequelize;
import subcategory from './subcategory.model.js'

import { isDefined } from '../../helpers/object-helper.js'
import { searchAttributeString } from '../../helpers/query-helper.js'

const insertSubcategory = async data => {
  return await subcategory.create(data)
}

const findSubcategory = async subcategoryInfo => {
  if (typeof(subcategoryInfo) === 'number') { 
    return await subcategory.findOne({
      where: {
        subcategory_id: subcategoryInfo,
        deletedAt: null,
      },
    })
  }else if (typeof(subcategoryInfo) === 'string') {
    return await subcategory.findAll({
      where: {
        subcategory_name: {
          [Op.like] : `%${subcategoryInfo}%`
        },
        deletedAt: null,
      },
    })
  }
}

const updateSubcategory = async (subcategoryID, data) => {
  await subcategory.update(data, {
    where: {
      id: subcategoryID,
      deletedAt: null,
    },
  })

  return await findSubcategory(subcategoryID)
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
  findSubcategory,
  updateSubcategory,
  deleteSubcategory,
}
